import { supabase } from './supabaseClient';

// Enregistrer un score
export async function saveScoreToSupabase({ user_id, game, score }) {
  // Upsert: met à jour si (user_id, game) existe, sinon insère
  const { error } = await supabase
    .from('scores')
    .upsert([{ user_id, game, score }], { onConflict: ['user_id', 'game'] });
  return error;
}

// Récupérer tous les scores d'un utilisateur
export async function fetchScoresForUser(user_id) {
  // Récupère le meilleur score par jeu pour cet utilisateur
  const { data, error } = await supabase
    .from('scores')
    .select('game, score, created_at')
    .eq('user_id', user_id)
    .order('score', { ascending: false })
    .order('created_at', { ascending: false });
  // Ne garde qu'un score par jeu (le plus haut)
  const bestByGame = {};
  if (data) {
    data.forEach(row => {
      if (!bestByGame[row.game]) {
        bestByGame[row.game] = row;
      }
    });
  }
  return { data: Object.values(bestByGame), error };
}
