# React + Vite

## Déploiement sécurisé (Netlify ou Vercel)

Pour mettre votre jeu en ligne de façon sécurisée :

### 1. Netlify
- Créez un compte sur https://netlify.com
- Cliquez sur « Add new site » > « Import an existing project »
- Connectez votre dépôt GitHub (ou glissez/déposez le dossier du projet)
- Netlify détecte automatiquement Vite/React
- Cliquez sur « Deploy site »
- HTTPS est activé automatiquement

### 2. Vercel
- Créez un compte sur https://vercel.com
- Cliquez sur « New Project »
- Connectez votre dépôt GitHub (ou importez le projet)
- Vercel détecte automatiquement Vite/React
- Cliquez sur « Deploy »
- HTTPS est activé automatiquement

### Conseils de sécurité supplémentaires
- Ne mettez jamais d’informations sensibles (mot de passe, clé API, etc.) dans le code front-end
- Gardez vos dépendances à jour (`npm update`)
- Utilisez la Content Security Policy (CSP) ajoutée dans index.html
- Privilégiez les images de sources sûres (ici Wikipédia)
- Pour une authentification ou restriction d’accès, il faut ajouter un backend sécurisé (non nécessaire pour un jeu public)


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
