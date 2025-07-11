import React, { useMemo } from 'react';

const circuitsImages = [
  '/circuits/albertpark.png', '/circuits/austin.png', '/circuits/bahrain.png', '/circuits/baku.png', '/circuits/barcelone.png',
  '/circuits/gillesvilleneuve.png', '/circuits/hungaroring.png', '/circuits/imola.png', '/circuits/interlagos.png', '/circuits/jeddah.png',
  '/circuits/lasvegas.png', '/circuits/losail.png', '/circuits/marinabay.png', '/circuits/mexico.png', '/circuits/miami.png',
  '/circuits/monaco.png', '/circuits/monza.png', '/circuits/redbullring.png', '/circuits/shanghai.png', '/circuits/silverstone.png',
  '/circuits/spa.png', '/circuits/suzuka.png', '/circuits/yasmarina.png', '/circuits/zandvoort.png'
];

function RandomCircuitImage() {
  const src = useMemo(() => circuitsImages[Math.floor(Math.random() * circuitsImages.length)], []);
  return <img src={src} alt="Circuit F1" style={{ height: 64, marginBottom: 12, borderRadius: 12, background: '#fff' }} />;
}

export default function Welcome({ onStart, onCapitales, onCircuits, onLogout }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh',
      fontFamily: 'inherit', padding: 32, background: '#f9fbfd', position: 'relative'
    }}>
      <button
        onClick={onLogout}
        style={{
          position: 'absolute', right: 24, top: 24, padding: '10px 22px', fontSize: 17, background: '#fff', border: '2px solid #e74c3c', color: '#e74c3c', borderRadius: 8, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 12px #e74c3c22', zIndex: 10
        }}
      >
        Déconnexion
      </button>
      <img src="/logo.png" alt="Logo YZ" style={{ height: 100, marginBottom: 32 }} />
      <h1 style={{ marginBottom: 8, fontSize: 54, color: '#0984e3', fontWeight: 900, letterSpacing: 2, textShadow: '1px 2px 12px #fff6, 0 1px 0 #fff' }}>
        Yassine gameZ
      </h1>
      <div style={{ fontSize: 26, color: '#222', marginBottom: 24, fontWeight: 600, textShadow: '0 2px 8px #fff8' }}>
        Bienvenue sur ta plateforme de quiz et de jeux funs !<br />
        Défie ta mémoire, découvre de nouveaux thèmes et bats tes records sur <span style={{ color: '#fdcb6e' }}>Yassine gameZ</span> 🎮
      </div>
      <div style={{ maxWidth: 700, fontSize: 22, color: '#1a1a1a', fontWeight: 500, background: '#fff', borderRadius: 14, boxShadow: '0 4px 24px #0001', padding: 32, marginBottom: 36, lineHeight: 1.7, textAlign: 'center' }}>
        <div style={{ marginBottom: 18 }}><b>Plusieurs jeux variés pour tester ta culture générale, ta mémoire et ta rapidité !</b></div>
        <div style={{ marginBottom: 14 }}><b>Principe&nbsp;:</b> Choisis ton défi parmi les jeux proposés ci-dessous, tente d'établir la meilleure série et amuse-toi !</div>
        <div style={{ marginBottom: 14 }}><b>Objectif&nbsp;:</b> Découvre, apprends et bats tes records sur des thèmes différents&nbsp;!</div>
      </div>
      <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 24, color: '#0a2239', letterSpacing: 1 }}>Jeux disponibles</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36, justifyContent: 'center', marginBottom: 12 }}>
        {/* Flag Game */}
        <div style={{ background: '#f1f6fa', borderRadius: 16, boxShadow: '0 2px 12px #0984e320', padding: 24, minWidth: 240, maxWidth: 270, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="/logo.png" alt="Drapeaux" style={{ height: 64, marginBottom: 12, borderRadius: 12 }} />
          <div style={{ fontSize: 23, fontWeight: 700, color: '#0984e3', marginBottom: 6 }}>Flag Games</div>
          <div style={{ fontSize: 16, color: '#222', marginBottom: 18, textAlign: 'center' }}>Devine le pays à partir de son drapeau. Idéal pour progresser en géographie !</div>
          <button onClick={onStart} style={{ fontSize: 18, fontWeight: 700, padding: '10px 28px', borderRadius: 8, background: 'linear-gradient(90deg,#0984e3 60%,#00b894 100%)', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 2px 12px #0984e355', letterSpacing: 1 }}>
            Jouer
          </button>
        </div>
        {/* Capitales Quiz */}
        <div style={{ background: '#f1f6fa', borderRadius: 16, boxShadow: '0 2px 12px #00b89420', padding: 24, minWidth: 240, maxWidth: 270, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="/logo.png" alt="Capitales" style={{ height: 64, marginBottom: 12, borderRadius: 12 }} />
          <div style={{ fontSize: 23, fontWeight: 700, color: '#00b894', marginBottom: 6 }}>Capitales Quiz</div>
          <div style={{ fontSize: 16, color: '#222', marginBottom: 18, textAlign: 'center' }}>Associe chaque pays à sa capitale. Parfait pour les amateurs de quiz rapides !</div>
          <button onClick={onCapitales} style={{ fontSize: 18, fontWeight: 700, padding: '10px 28px', borderRadius: 8, background: 'linear-gradient(90deg,#00b894 60%,#0984e3 100%)', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 2px 12px #00b89455', letterSpacing: 1 }}>
            Jouer
          </button>
        </div>
        {/* Circuits F1 */}
        <div style={{ background: '#f1f6fa', borderRadius: 16, boxShadow: '0 2px 12px #fdcb6e20', padding: 24, minWidth: 240, maxWidth: 270, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="/logo.png" alt="Circuits F1" style={{ height: 64, marginBottom: 12, borderRadius: 12 }} />
          <div style={{ fontSize: 23, fontWeight: 700, color: '#fdcb6e', marginBottom: 6, textShadow: '0 1px 0 #8882' }}>Circuits F1</div>
          <div style={{ fontSize: 16, color: '#222', marginBottom: 18, textAlign: 'center' }}>Reconnais les tracés officiels des circuits du championnat du monde de Formule 1 !</div>
          <button onClick={onCircuits} style={{ fontSize: 18, fontWeight: 700, padding: '10px 28px', borderRadius: 8, background: 'linear-gradient(90deg,#fdcb6e 60%,#0984e3 100%)', color: '#222', border: 'none', cursor: 'pointer', boxShadow: '0 2px 12px #fdcb6e55', letterSpacing: 1 }}>
            Jouer
          </button>
        </div>
        {/* Jeu à venir */}
        <div style={{ background: '#f1f6fa', borderRadius: 16, boxShadow: '0 2px 12px #b2bec320', padding: 24, minWidth: 240, maxWidth: 270, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.7 }}>
          <img src="/logo.png" alt="Mystère" style={{ height: 64, marginBottom: 12, filter: 'grayscale(0.7)', borderRadius: 12 }} />
          <div style={{ fontSize: 23, fontWeight: 700, color: '#636e72', marginBottom: 6 }}>Villes Mystères</div>
          <div style={{ fontSize: 16, color: '#222', marginBottom: 18, textAlign: 'center' }}>(Bientôt disponible)</div>
          <button disabled style={{ fontSize: 18, fontWeight: 700, padding: '10px 28px', borderRadius: 8, background: '#b2bec3', color: '#fff', border: 'none', cursor: 'not-allowed', letterSpacing: 1 }}>
            À venir
          </button>
        </div>
      </div>
    </div>
  );
}