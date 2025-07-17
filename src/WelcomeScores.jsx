import React, { useEffect, useState } from 'react';
import { fetchScoresForUser } from './supabaseScores';
import { supabase } from './supabaseClient';

export default function WelcomeScores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadScores() {
      setLoading(true);
      setError(null);
      const session = (await supabase.auth.getSession()).data.session;
      if (!session || !session.user) {
        setScores([]);
        setLoading(false);
        return;
      }
      const { data, error } = await fetchScoresForUser(session.user.id);
      if (mounted) {
        setScores(data || []);
        setError(error);
        setLoading(false);
      }
    }
    loadScores();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div style={{margin:'32px 0',color:'#0984e3',fontSize:22,textAlign:'center'}}>Chargement de vos scores…</div>;
  if (error) return <div style={{margin:'32px 0',color:'#e74c3c',fontSize:22,textAlign:'center'}}>Erreur lors du chargement des scores.</div>;
  if (!scores.length) return (
    <div style={{margin:'48px auto',maxWidth:500,background:'#fff',borderRadius:18,boxShadow:'0 2px 16px #0984e330',padding:32,textAlign:'center'}}>
      <h2 style={{fontSize:32,marginBottom:20,color:'#0984e3',fontWeight:900,letterSpacing:1}}>Mes scores récents</h2>
      <div style={{fontSize:22,color:'#b2bec3',marginTop:32,fontWeight:700}}>Aucun score enregistré pour le moment.<br/>Joue à un quiz pour voir ton score ici !</div>
    </div>
  );

  // Emoji ou icône par jeu
  const gameIcons = {
    flags: <img src="/flag-logo.svg" alt="Drapeau" style={{height:28,verticalAlign:'middle',marginRight:8}} />, // Logo SVG
    capitales: '🌍',
    circuits: '🏎️',
  };

  const gameLabels = {
    flags: 'Drapeaux',
    capitales: 'Capitales',
    circuits: 'Circuits F1',
  };

  return (
    <div style={{margin:'32px auto',maxWidth:700,background:'#fff',borderRadius:18,boxShadow:'0 2px 16px #0984e330',padding:32}}>
      <h2 style={{fontSize:32,marginBottom:20,color:'#0984e3',fontWeight:900,letterSpacing:1}}>Mes scores récents</h2>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',fontSize:22,borderCollapse:'collapse',background:'#f9fbfd'}}>
          <thead>
            <tr style={{background:'#dff6fd'}}>
              <th style={{padding:14,borderRadius:8,textAlign:'center',color:'#0984e3',fontSize:20,letterSpacing:1}}>Jeu</th>
              <th style={{padding:14,borderRadius:8,textAlign:'center',color:'#0984e3',fontSize:20,letterSpacing:1}}>Score</th>
              <th style={{padding:14,borderRadius:8,textAlign:'center',color:'#0984e3',fontSize:20,letterSpacing:1}}>Dernière mise à jour</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, idx) => (
              <tr key={score.game} style={{background: idx%2===0 ? '#f1f6fa' : '#fff',transition:'background 0.2s',cursor:'pointer'}}
                onMouseOver={e => e.currentTarget.style.background='#e3f3fc'}
                onMouseOut={e => e.currentTarget.style.background=idx%2===0?'#f1f6fa':'#fff'}>
                <td style={{padding:14,textAlign:'center',fontWeight:700,fontSize:26}}>
                  <span style={{fontSize:28,marginRight:10}}>{gameIcons[score.game]||'🎮'}</span>
                  {gameLabels[score.game]||score.game}
                </td>
                <td style={{padding:14,textAlign:'center',fontWeight:900,fontSize:28,color:'#00b894',letterSpacing:1}}>{score.score}</td>
                <td style={{padding:14,textAlign:'center',fontSize:18,color:'#636e72'}}>{score.created_at ? new Date(score.created_at).toLocaleString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
