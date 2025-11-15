# Light Service

Projet Next.js (App Router) avec TypeScript et Tailwind CSS.

## Prérequis
- Node.js 20+
- npm (ou pnpm/yarn si vous préférez)

## Installation
```bash
npm install --legacy-peer-deps
```

## Développement
```bash
npm run dev
# puis ouvrir http://localhost:3000
```

## Build de production
```bash
npm run build
npm start
# l’application écoute par défaut sur http://localhost:3000
```

## Scripts
- `dev`: démarre le serveur de développement
- `build`: construit l’application
- `start`: lance le serveur en mode production
- `lint`: lance ESLint (si installé globalement ou localement)

## Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4 (@tailwindcss/postcss)
- Radix UI / shadcn-like components

## Notes
- Les images OpenGraph/Twitter utilisent pour l’instant des placeholders (`/placeholder.jpg`, `/placeholder-logo.png`). Remplacez-les par vos assets finaux dans `app/layout.tsx` et le dossier `public/`.
- `next.config.mjs` a `typescript.ignoreBuildErrors: true` pour fluidifier le dev. À retirer une fois les erreurs corrigées.

## Structure
```
app/
components/
public/
styles/
hooks/
lib/
```

## Lint & Format
- Un fichier `.eslintrc.json` et une configuration Prettier sont fournis. Installez les dépendances si nécessaire.

## Licence
Ajoutez votre licence ici.
