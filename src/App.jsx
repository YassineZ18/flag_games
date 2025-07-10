import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import './App.css';

const drapeaux = [
  { url: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg", pays: "France" },
  { url: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg", pays: "Italie" },
  { url: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg", pays: "Japon" },
  { url: "https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg", pays: "Brésil" },
  { url: "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg", pays: "Allemagne" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg", pays: "Canada" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg", pays: "Maroc" },
  { url: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg", pays: "Inde" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg", pays: "Suède" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg", pays: "Norvège" },
  { url: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg", pays: "États-Unis" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg", pays: "Portugal" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg", pays: "Mexique" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg", pays: "Australie" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg", pays: "Belgique" }
];

function App() {
  const TIMER_DURATION = 10;
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState("");
  const [vies, setVies] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [serie, setSerie] = useState(0);
  const [bestSerie, setBestSerie] = useState(0);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const timerRef = React.useRef();
  const [index, setIndex] = useState(() => Math.floor(Math.random() * drapeaux.length));
  const [propositions, setPropositions] = useState([]);
  const [answered, setAnswered] = useState(false);

  // Mélangeur
  function shuffle(array) {
    return array
      .map((v) => ({ v, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ v }) => v);
  }

  // Propositions à chaque changement de drapeau
  useEffect(() => {
    let autres = drapeaux.filter((_, i) => i !== index);
    autres = shuffle(autres).slice(0, 3);
    const opts = shuffle([
      { label: drapeaux[index].pays, correct: true },
      ...autres.map(d => ({ label: d.pays, correct: false }))
    ]);
    setPropositions(opts);
    setAnswered(false);
    setMessage("");
    setTimer(TIMER_DURATION);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(t => t - 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [index]);

  // Auth Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Timer effect: perte de vie si temps écoulé
  useEffect(() => {
    if (timer === 0 && !answered && !gameOver) {
      setAnswered(true);
      setVies(v => {
        if (v - 1 <= 0) {
          setGameOver(true);
          setMessage("Temps écoulé ! Vous avez perdu !");
          return 0;
        }
        setMessage("Temps écoulé ! -1 vie");
        return v - 1;
      });
      setBestSerie(b => serie > b ? serie : b);
      setSerie(0);
      clearInterval(timerRef.current);
    }
    return undefined;
  }, [timer, answered, gameOver, serie]);

  const handleGuess = (isCorrect) => {
    setAnswered(true);
    clearInterval(timerRef.current);
    if (isCorrect) {
      setSerie(s => {
        const nouvelleSerie = s + 1;
        setBestSerie(b => nouvelleSerie > b ? nouvelleSerie : b);
        if (nouvelleSerie % 3 === 0) {
          let nouvelleVie = vies < 3 ? vies + 1 : 3;
          if (vies < 3) setMessage(`Bravo ! Série de 3 réussie, +1 vie ! (${nouvelleVie}/3)`);
          else setMessage("Bravo ! Série de 3 réussie ! (3/3)");
          setVies(nouvelleVie);
        } else {
          setMessage(`Bonne réponse ! Série : ${nouvelleSerie}/3`);
        }
        return nouvelleSerie;
      });
    } else {
      setVies(v => {
        if (v - 1 <= 0) {
          setGameOver(true);
          setMessage("Vous avez perdu !");
          return 0;
        }
        setMessage("Mauvaise réponse. Essaie encore !");
        return v - 1;
      });
      setBestSerie(b => serie > b ? serie : b);
      setSerie(0);
    }
  };

  const suivant = () => {
    clearInterval(timerRef.current);
    let next;
    do {
      next = Math.floor(Math.random() * drapeaux.length);
    } while (next === index);
    setIndex(next);
  };

  const rejouer = () => {
    clearInterval(timerRef.current);
    setVies(3);
    setGameOver(false);
    setMessage("");
    setSerie(0);
    setBestSerie(0);
    setIndex(Math.floor(Math.random() * drapeaux.length));
  };

  if (!session) {
    return <Auth onAuth={() => supabase.auth.getSession().then(({ data: { session } }) => setSession(session))} />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <button onClick={async () => { await supabase.auth.signOut(); }} style={{ position: 'absolute', right: 20, top: 20, padding: '8px 16px', fontSize: 14 }}>Déconnexion</button>
      <img src="/logo.png" alt="Logo YZ" style={{ height: 80, marginBottom: 12 }} />
      <h1 style={{ marginBottom: 4 }}>Flag Games</h1>
      <div style={{ fontSize: 16, color: '#888', marginBottom: 18 }}>by Yassine Zaoui</div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        marginBottom: 10,
        marginTop: 10,
      }}>
        <div style={{
          background: '#ffeaa7',
          border: '2px solid #fdcb6e',
          borderRadius: 12,
          padding: '12px 28px',
          fontSize: 26,
          fontWeight: 'bold',
          color: '#d35400',
          boxShadow: '0 2px 8px #fdcb6e55',
          minWidth: 170,
        }}>
          🔥 Série actuelle&nbsp;:<br /><span style={{fontSize:32}}>{serie}</span>
        </div>
        <div style={{
          background: '#a3eafc',
          border: '2px solid #00bfff',
          borderRadius: 12,
          padding: '12px 28px',
          fontSize: 26,
          fontWeight: 'bold',
          color: '#0984e3',
          boxShadow: '0 2px 8px #00bfff33',
          minWidth: 170,
        }}>
          🏆 Meilleure série&nbsp;:<br /><span style={{fontSize:32}}>{bestSerie}</span>
        </div>
      </div>
      <div style={{ fontSize: 22, marginBottom: 8 }}>
        Vies : {Array.from({length: vies}).map((_,i) => '❤️').join(' ')}
      </div>
      <div style={{
        fontSize: 32,
        fontWeight: 'bold',
        color: timer > 3 ? '#27ae60' : '#e74c3c',
        background: '#f5f6fa',
        border: '2px solid #dfe6e9',
        borderRadius: 10,
        width: 120,
        margin: '0 auto 18px',
        padding: '6px 0',
        boxShadow: '0 2px 6px #dfe6e955',
        letterSpacing: 2
      }}>
        ⏰ {timer}s
      </div>
      <img 
        src={drapeaux[index].url} 
        alt="Drapeau à deviner" 
        style={{ width: 200, border: "1px solid #ccc", marginBottom: 20 }}
        onError={e => { e.target.onerror = null; e.target.src = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"; }}
      />
      <div style={{ color: '#ccc', fontSize: 12, marginBottom: 10 }}>{drapeaux[index].url}</div>
      <div style={{ marginBottom: 20 }}>
        {propositions.map((option) => (
          <button
            key={option.label}
            onClick={() => handleGuess(option.correct)}
            style={{ margin: 8, padding: "10px 24px", fontSize: 18 }}
            disabled={answered || gameOver}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 20, marginBottom: 10 }}>{message}</div>
      <button onClick={suivant} disabled={!answered || gameOver} style={{ padding: '8px 24px', fontSize: 16, marginBottom: 12 }}>
        Suivant
      </button>
      {gameOver && (
        <div style={{ marginTop: 20 }}>
          <button onClick={rejouer} style={{ padding: '10px 28px', fontSize: 18, background: '#e74c3c', color: 'white', border: 'none', borderRadius: 8 }}>
            Rejouer
          </button>
        </div>
      )}
    </div>
  );
}

export default App;