import React, { useState, useRef, useEffect } from 'react';

// Liste de circuits, image et nom officiel
const circuits = [
  { nom: "Bahreïn", image: "/circuits/bahrain.png" },
  { nom: "Jeddah", image: "/circuits/jeddah.png" },
  { nom: "Melbourne", image: "/circuits/albertpark.png" },
  { nom: "Suzuka", image: "/circuits/suzuka.png" },
  { nom: "Shanghai", image: "/circuits/shanghai.png" },
  { nom: "Miami", image: "/circuits/miami.png" },
  { nom: "Imola", image: "/circuits/imola.png" },
  { nom: "Monaco", image: "/circuits/monaco.png" },
  { nom: "Gilles Villeneuve", image: "/circuits/gillesvilleneuve.png" },
  { nom: "Barcelone", image: "/circuits/barcelone.png" },
  { nom: "Red Bull Ring", image: "/circuits/redbullring.png" },
  { nom: "Silverstone", image: "/circuits/silverstone.png" },
  { nom: "Hungaroring", image: "/circuits/hungaroring.png" },
  { nom: "Spa-Francorchamps", image: "/circuits/spa.png" },
  { nom: "Zandvoort", image: "/circuits/zandvoort.png" },
  { nom: "Monza", image: "/circuits/monza.png" },
  { nom: "Baku", image: "/circuits/baku.png" },
  { nom: "Marina Bay", image: "/circuits/marinabay.png" },
  { nom: "COTA (Austin)", image: "/circuits/austin.png" },
  { nom: "Mexico", image: "/circuits/mexico.png" },
  { nom: "Interlagos", image: "/circuits/interlagos.png" },
  { nom: "Las Vegas", image: "/circuits/lasvegas.png" },
  { nom: "Losail", image: "/circuits/losail.png" },
  { nom: "Yas Marina", image: "/circuits/yasmarina.png" }
];

const TIMER_DURATION = 12;

export default function CircuitsF1Quiz({ onHome, onLogout }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * circuits.length));
  const [propositions, setPropositions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const timerRef = useRef();
  const [vies, setVies] = useState(3);
  const [serie, setSerie] = useState(0);
  const [bestSerie, setBestSerie] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [forceRefresh, setForceRefresh] = useState(0);

  function shuffle(array) {
    return array
      .map((v) => ({ v, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ v }) => v);
  }

  useEffect(() => {
    // Propositions : nom officiel + 1 alias du même circuit + 2 vrais noms d'autres circuits
    if (gameOver || vies <= 0) {
      clearInterval(timerRef.current);
      return;
    }
    const current = circuits[index];
    let options = [{ label: current.nom, correct: true }];
    if (current.autres && current.autres.length > 0) {
      options.push({ label: current.autres[0], correct: false });
    }
    let autresCircuits = circuits.filter((_, i) => i !== index);
    autresCircuits = shuffle(autresCircuits).slice(0, 2);
    autresCircuits.forEach(item => {
      options.push({ label: item.nom, correct: false });
    });
    if (options.length < 4) {
      let toAdd = 4 - options.length;
      let extra = shuffle(circuits.filter((_, i) => i !== index)).slice(0, toAdd);
      extra.forEach(item => {
        options.push({ label: item.nom, correct: false });
      });
    }
    setPropositions(shuffle(options));
    setAnswered(false);
    setTimer(TIMER_DURATION);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          if (!gameOver && vies > 0) handleGuess(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [index, vies, gameOver, forceRefresh]);

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
        setIndex(Math.floor(Math.random() * circuits.length));
        setMessage("");
        setForceRefresh(f => f + 1); // Force le useEffect à se relancer
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
          setIndex(Math.floor(Math.random() * circuits.length));
          setMessage("");
          setForceRefresh(f => f + 1); // Force le useEffect à se relancer
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
    setIndex(Math.floor(Math.random() * circuits.length));
  }

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <div style={{ position: 'absolute', right: 20, top: 20, display: 'flex', gap: 10 }}>
        <button onClick={onHome} style={{ padding: '8px 16px', fontSize: 14, background: '#fff', border: '1px solid #00b894', color: '#00b894', borderRadius: 6, marginRight: 8, cursor: 'pointer' }}>
          Accueil
        </button>
        <button onClick={onLogout} style={{ padding: '8px 16px', fontSize: 14 }}>Déconnexion</button>
      </div>
      <h1 style={{ marginBottom: 18, color: '#0984e3' }}>Devine le circuit de Formule 1</h1>
      <img src={circuits[index].image} alt="Circuit F1"
        onError={e => { e.target.onerror = null; e.target.src = "/no-circuit.svg"; }}
        style={{ height: 320, maxWidth: '95vw', width: 'auto', marginBottom: 24, border: '2px solid #00b894', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0001' }} />
      <div style={{ fontSize: 16, color: '#888', marginBottom: 18 }}>Sélectionne le bon nom pour ce tracé</div>
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
