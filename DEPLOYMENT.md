# Déploiement sur Vercel

Ce guide vous explique comment déployer votre site Studio Boudoir sur Vercel.

## Méthode 1 : Déploiement via GitHub (Recommandé)

### Étape 1 : Accéder à Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Sign Up" ou "Login"
3. Connectez-vous avec votre compte GitHub

### Étape 2 : Importer le projet
1. Cliquez sur "Add New..." → "Project"
2. Sélectionnez votre repository GitHub : `imathtek-blip/Test`
3. Vercel détectera automatiquement Next.js

### Étape 3 : Configuration
Vercel détectera automatiquement la configuration grâce au fichier `vercel.json`.

**Paramètres par défaut :**
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Development Command:** `npm run dev`

### Étape 4 : Variables d'environnement (optionnel)
Si vous avez des variables d'environnement, ajoutez-les dans :
Settings → Environment Variables

Exemple :
```
NEXT_PUBLIC_API_URL=https://api.votresite.com
```

### Étape 5 : Déployer
1. Cliquez sur "Deploy"
2. Attendez quelques minutes
3. Votre site sera disponible sur une URL type : `votre-projet.vercel.app`

## Méthode 2 : Déploiement via CLI

### Prérequis
```bash
npm install -g vercel
```

### Connexion
```bash
vercel login
```

### Déploiement
```bash
# Déploiement de test
vercel

# Déploiement en production
vercel --prod
```

## Configuration automatique

Le fichier `vercel.json` est déjà configuré avec :
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["cdg1"]
}
```

## Domaine personnalisé

### Ajouter un domaine
1. Allez dans Settings → Domains
2. Ajoutez votre domaine (ex: studioboudoir.com)
3. Suivez les instructions pour configurer les DNS

### Configuration DNS recommandée
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Déploiement automatique

Vercel déploie automatiquement :
- **Production :** À chaque push sur la branche `main`
- **Preview :** À chaque push sur les autres branches
- **Pull Request :** Un déploiement preview pour chaque PR

## Optimisations Vercel

### Edge Functions
Le site utilise Next.js 16 avec App Router, optimisé pour les Edge Functions.

### Image Optimization
Next.js Image est automatiquement optimisé par Vercel :
- Formats WebP/AVIF automatiques
- Lazy loading
- Responsive images

### Analytics (optionnel)
Activez Vercel Analytics pour suivre les performances :
1. Settings → Analytics
2. Activez "Speed Insights" et "Web Analytics"

## Problèmes courants

### Build échoue
```bash
# Tester le build localement
npm run build

# Vérifier les dépendances
npm install
```

### Variables d'environnement manquantes
Ajoutez-les dans Settings → Environment Variables sur Vercel

### Cache
Redéployez en forçant un rebuild :
```bash
vercel --prod --force
```

## Support

- [Documentation Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Support](https://vercel.com/support)

---

## URLs du projet

Après déploiement, vous aurez :
- **URL de production :** `https://votre-projet.vercel.app`
- **Domaine personnalisé :** `https://studioboudoir.com` (si configuré)
- **Preview branches :** `https://test-git-[branch].vercel.app`

## Commandes utiles

```bash
# Voir les déploiements
vercel list

# Voir les logs
vercel logs

# Promouvoir un déploiement preview en production
vercel promote [deployment-url]

# Supprimer un déploiement
vercel remove [deployment-id]
```
