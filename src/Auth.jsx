import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Auth({ onAuth }) {
  // Gestion des emails mémorisés
  // Lecture directe du localStorage à chaque rendu
  const getSavedEmails = () => {
    try {
      return JSON.parse(localStorage.getItem('yz_emails') || '[]');
    } catch {
      return [];
    }
  };
  const savedEmails = getSavedEmails();
  const [email, setEmail] = useState('');

  
  const [showSelect, setShowSelect] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveEmail = (newEmail) => {
    if (!newEmail) return;
    let emails = [];
    try {
      emails = JSON.parse(localStorage.getItem('yz_emails') || '[]');
    } catch {
      emails = [];
    }
    const updated = Array.from(new Set([newEmail, ...emails])).slice(0, 5);
    localStorage.setItem('yz_emails', JSON.stringify(updated));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else {
      saveEmail(email);
      onAuth();
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else {
      saveEmail(email);
      onAuth();
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f9fbfd 70%, #e3f6fc 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 40,
      paddingBottom: 40
    }}>
      <img src="/logo.png" alt="Logo YZ" style={{ height: 90, marginBottom: 18, borderRadius: 16, boxShadow: '0 4px 24px #0984e322' }} />
      <h2 style={{ color: '#0984e3', fontWeight: 900, fontSize: 38, marginBottom: 4, letterSpacing: 2, textShadow: '0 2px 12px #fff8' }}>Connexion</h2>
      <div style={{ color: '#636e72', fontSize: 18, marginBottom: 28, fontWeight: 500 }}>Rejoins la communauté Yassine gameZ et défie tes amis !</div>
      <div style={{
        maxWidth: 370,
        width: '95%',
        margin: '0 auto',
        padding: 28,
        borderRadius: 18,
        background: '#fff',
        boxShadow: '0 4px 24px #0984e322',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <form style={{ width: '100%' }}>
          {savedEmails.length > 0 && (
  <div style={{ marginBottom: 10 }}>
    <label htmlFor="email-select" style={{ fontWeight: 600, color: '#636e72', fontSize: 15 }}>Identifiant déjà utilisé :</label>
    <select
      id="email-select"
      value={email || ''}
      onChange={e => {
        setEmail(e.target.value);
        setShowSelect(false);
      }}
      style={{ width: '100%', marginTop: 6, marginBottom: 10, padding: '10px 8px', fontSize: 16, borderRadius: 8, border: '1px solid #b2bec3', background: '#f9fbfd', cursor: 'pointer' }}
    >
      <option value="">-- Saisir un nouvel email --</option>
      {savedEmails.map((em, i) => <option key={em + i} value={em}>{em}</option>)}
    </select>
    <button type="button" onClick={() => {
      localStorage.removeItem('yz_emails');
      setEmail('');
    }} style={{ marginTop: 4, fontSize: 13, color: '#e74c3c', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
      Effacer l’historique des emails
    </button>
  </div>
)}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', marginBottom: 14, padding: '12px 10px', fontSize: 17, borderRadius: 8, border: '1px solid #b2bec3', outline: 'none', boxShadow: '0 2px 8px #dfe6e955', background: '#f9fbfd', color: '#222' }}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', marginBottom: 16, padding: '12px 10px', fontSize: 17, borderRadius: 8, border: '1px solid #b2bec3', outline: 'none', boxShadow: '0 2px 8px #dfe6e955', background: '#f9fbfd', color: '#222' }}
          />
          <button onClick={handleSignIn} disabled={loading} style={{ width: '100%', padding: '12px 0', fontSize: 18, marginBottom: 10, borderRadius: 8, background: 'linear-gradient(90deg,#0984e3 60%,#00b894 100%)', color: '#fff', border: 'none', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: 1, boxShadow: '0 2px 12px #0984e355' }}>
            Se connecter
          </button>
          <button onClick={handleSignUp} disabled={loading} style={{ width: '100%', padding: '12px 0', fontSize: 18, borderRadius: 8, background: 'linear-gradient(90deg,#00b894 60%,#0984e3 100%)', color: '#fff', border: 'none', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: 1, boxShadow: '0 2px 12px #00b89455' }}>
            Créer un compte
          </button>
          {error && <div style={{ color: 'red', marginTop: 14, fontWeight: 600, textAlign: 'center' }}>{error}</div>}
        </form>
      </div>
      <div style={{ marginTop: 32, color: '#636e72', fontSize: 18, maxWidth: 350, textAlign: 'center', fontStyle: 'italic' }}>
        "Le jeu, c’est la plus haute forme de la recherche."<br /><span style={{fontSize:15}}>– Albert Einstein</span>
      </div>
    </div>
  );
}
