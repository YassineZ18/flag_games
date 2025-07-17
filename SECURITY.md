# Guide de sécurité

## Variables d'environnement

### Configuration locale
1. Copiez `.env.example` vers `.env`
2. Remplissez les valeurs appropriées
3. Ne jamais committer le fichier `.env`

### Déploiement (Netlify)
1. Allez dans votre dashboard Netlify
2. Site settings > Environment variables
3. Ajoutez les variables :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Sécurité Supabase

### Row Level Security (RLS)
Assurez-vous que RLS est activé sur toutes les tables :

```sql
-- Exemple pour la table scores
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre aux utilisateurs de voir leurs propres scores
CREATE POLICY "Users can view own scores" ON scores
    FOR SELECT USING (auth.uid() = user_id);

-- Politique pour permettre aux utilisateurs d'insérer leurs propres scores
CREATE POLICY "Users can insert own scores" ON scores
    FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## Bonnes pratiques

### Clés API
- ❌ Ne jamais exposer de clés API privées côté client
- ✅ Utiliser uniquement les clés publiques (anon key Supabase)
- ✅ Configurer les variables d'environnement sur la plateforme de déploiement

### Content Security Policy
- ✅ CSP configurée dans index.html
- ✅ Protection contre XSS et clickjacking
- ✅ Sources d'images restreintes

### Authentification
- ✅ Utilisation de Supabase Auth
- ✅ Sessions gérées automatiquement
- ⚠️ Vérifier la configuration RLS en base

## Audit de sécurité

Commandes à exécuter régulièrement :
```bash
npm audit
npm update
```

## Signalement de vulnérabilités

Si vous découvrez une vulnérabilité, contactez : [votre-email@domain.com]
