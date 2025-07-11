import React, { useState, useRef, useEffect } from 'react';

const capitales = [
  { pays: "France", capitale: "Paris", autres: ["Lyon", "Marseille"] },
  { pays: "Italie", capitale: "Rome", autres: ["Milan", "Naples"] },
  { pays: "Japon", capitale: "Tokyo", autres: ["Osaka", "Kyoto"] },
  { pays: "Brésil", capitale: "Brasilia", autres: ["Rio de Janeiro", "Sao Paulo"] },
  { pays: "Allemagne", capitale: "Berlin", autres: ["Munich", "Hambourg"] },
  { pays: "Canada", capitale: "Ottawa", autres: ["Toronto", "Montréal"] },
  { pays: "Maroc", capitale: "Rabat", autres: ["Casablanca", "Marrakech"] },
  { pays: "Inde", capitale: "New Delhi", autres: ["Mumbai", "Bangalore"] },
  { pays: "Suède", capitale: "Stockholm", autres: ["Göteborg", "Malmö"] },
  { pays: "Norvège", capitale: "Oslo", autres: ["Bergen", "Trondheim"] },
  { pays: "États-Unis", capitale: "Washington", autres: ["New York", "Los Angeles"] },
  { pays: "Portugal", capitale: "Lisbonne", autres: ["Porto", "Coimbra"] },
  { pays: "Mexique", capitale: "Mexico", autres: ["Guadalajara", "Monterrey"] },
  { pays: "Australie", capitale: "Canberra", autres: ["Sydney", "Melbourne"] },
  { pays: "Belgique", capitale: "Bruxelles", autres: ["Anvers", "Gand"] }
];

const TIMER_DURATION = 10;

export default function CapitalesQuiz({ onHome, onLogout }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * capitales.length));
  const [propositions, setPropositions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const timerRef = useRef();
  const [vies, setVies] = useState(3);
  const [serie, setSerie] = useState(0);
  const [bestSerie, setBestSerie] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  function shuffle(array) {
    return array
      .map((v) => ({ v, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ v }) => v);
  }

  useEffect(() => {
    // Génère les propositions à chaque nouvelle question
    const current = capitales[index];
    let options = [{ label: current.capitale, correct: true }];
    // Ajoute une grande ville du même pays si dispo
    if (current.autres && current.autres.length > 0) {
      options.push({ label: current.autres[0], correct: false });
    }
    // Ajoute 2 capitales d'autres pays
    let autresPays = capitales.filter((_, i) => i !== index);
    autresPays = shuffle(autresPays).slice(0, 2);
    autresPays.forEach(item => {
      options.push({ label: item.capitale, correct: false });
    });
    // Si pas d'autre ville dispo, complète avec 3 capitales comme avant
    if (options.length < 4) {
      let toAdd = 4 - options.length;
      let extra = shuffle(capitales.filter((_, i) => i !== index)).slice(0, toAdd);
      extra.forEach(item => {
        options.push({ label: item.capitale, correct: false });
      });
    }
    setPropositions(shuffle(options));
    setAnswered(false);
    setTimer(TIMER_DURATION);
    clearInterval(timerRef.current);
    if (!gameOver && vies > 0) {
      timerRef.current = setInterval(() => {
        setTimer(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            handleGuess(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [index, vies, gameOver]);

  function handleGuess(isCorrect) {
    setAnswered(true);
    clearInterval(timerRef.current);
    if (isCorrect) {
      setSerie(s => {
        const newSerie = s + 1;
        setBestSerie(b => Math.max(b, newSerie));
        return newSerie;
      });
      setMessage("Bravo !");
      setTimeout(() => {
        setIndex(Math.floor(Math.random() * capitales.length));
        setMessage("");
      }, 900);
    } else {
      setVies(v => {
        if (v - 1 <= 0) {
          setGameOver(true);
          setMessage("Fini ! Votre meilleure série : " + bestSerie);
          return 0;
        }
        setMessage("Raté !");
        setTimeout(() => {
          setIndex(Math.floor(Math.random() * capitales.length));
          setMessage("");
        }, 900);
        setSerie(0);
        return v - 1;
      });
    }
  }

  function restart() {
    setVies(3);
    setSerie(0);
    setBestSerie(0);
    setGameOver(false);
    setMessage("");
    setIndex(Math.floor(Math.random() * capitales.length));
  }

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <div style={{ position: 'absolute', right: 20, top: 20, display: 'flex', gap: 10 }}>
        <button onClick={onHome} style={{ padding: '8px 16px', fontSize: 14, background: '#fff', border: '1px solid #00b894', color: '#00b894', borderRadius: 6, marginRight: 8, cursor: 'pointer' }}>
          Accueil
        </button>
        <button onClick={onLogout} style={{ padding: '8px 16px', fontSize: 14 }}>Déconnexion</button>
      </div>
      <img src="/logo.png" alt="Logo YZ" style={{ height: 80, marginBottom: 12 }} />
      <h1 style={{ marginBottom: 4, color: '#0984e3' }}>Capitales Quiz</h1>
      <div style={{ fontSize: 16, color: '#888', marginBottom: 18 }}>Trouve la capitale du pays indiqué</div>
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 18 }}>
        Pays : <span style={{ color: '#00b894' }}>{capitales[index].pays}</span>
      </div>
      <div style={{ fontSize: 22, marginBottom: 18 }}>
        {Array.from({ length: vies }).map((_, i) => (
          <span key={i} style={{ color: '#e17055', fontSize: 28, marginRight: 4 }}>❤️</span>
        ))}
        {vies === 0 && <span style={{ color: '#e17055', fontSize: 22 }}>GAME OVER</span>}
      </div>
      <div style={{ fontSize: 18, marginBottom: 10 }}>Série : <b>{serie}</b> &nbsp;|&nbsp; Meilleure série : <b>{bestSerie}</b></div>
      <div style={{ marginBottom: 18 }}>
        {propositions.map((option, i) => (
          <button
            key={i}
            onClick={() => handleGuess(option.correct)}
            disabled={answered || gameOver || vies === 0}
            style={{
              fontSize: 20,
              padding: '12px 32px',
              margin: '0 10px 10px 0',
              borderRadius: 8,
              background: option.correct && answered ? '#00b894' : '#0984e3',
              color: '#fff',
              border: 'none',
              cursor: answered || gameOver || vies === 0 ? 'not-allowed' : 'pointer',
              opacity: answered && !option.correct ? 0.6 : 1
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 22, margin: '18px 0', color: message.startsWith('Bravo') ? '#00b894' : '#e17055' }}>{message}</div>
      <div style={{ fontSize: 18, marginBottom: 24 }}>Temps restant : <b>{timer}s</b></div>
      {gameOver && (
        <button onClick={restart} style={{ fontSize: 18, padding: '10px 30px', borderRadius: 8, background: '#0984e3', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Rejouer
        </button>
      )}
    </div>
  );
}
