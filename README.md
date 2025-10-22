# Studio Boudoir - Site Web Professionnel

Un site web élégant et moderne pour un studio de photographie boudoir, érotique et mode, construit avec les dernières technologies web.

## Technologies Utilisées

- **Next.js 16** - Framework React avec App Router
- **TypeScript** - Pour un code robuste et type-safe
- **Tailwind CSS** - Framework CSS utilitaire moderne
- **Framer Motion** - Animations fluides et élégantes
- **React Hook Form + Zod** - Gestion des formulaires avec validation
- **bcryptjs** - Hachage des mots de passe

## Caractéristiques

### Design
- **Palette de couleurs** : 90% blanc, 5% rose (#FFB6D9), 5% bleu (#B6D4FF)
- **Design responsive** : Optimisé pour mobile, tablette et desktop
- **Animations élégantes** : Transitions fluides avec Framer Motion
- **Typographie professionnelle** : Playfair Display et Inter

### Pages
- ✨ **Accueil** : Hero section avec animations, présentation du studio
- 📸 **Galerie** : Grille de photos avec filtres par catégorie et lightbox
- 💰 **Tarifs** : Offre unique à 300€ avec détails
- 📧 **Contact** : Formulaire de contact avec validation
- 🔐 **Administration** : Panel admin pour gérer les photos et messages

### Fonctionnalités
- Formulaire de contact avec sauvegarde des messages
- Panel d'administration simple
- Gestion de galerie photo
- Système de catégories (Boudoir, Mode, Artistique)
- Design optimisé pour le SEO

## Installation

1. **Installer les dépendances** :
```bash
npm install
```

2. **Lancer le serveur de développement** :
```bash
npm run dev
```

3. **Ouvrir dans le navigateur** :
Accédez à [http://localhost:3000](http://localhost:3000)

## Utilisation

### Espace Public
- **Accueil** : `/` - Présentation du studio et services
- **Galerie** : `/gallery` - Portfolio de photos
- **Tarifs** : `/pricing` - Informations sur l'offre unique
- **Contact** : `/contact` - Formulaire de contact et coordonnées

### Espace Admin
- **URL** : `/admin`
- **Mot de passe par défaut** : `admin123` ⚠️ À CHANGER EN PRODUCTION !

#### Fonctionnalités Admin
- **Messages** : Visualiser et gérer les messages de contact
- **Galerie** : Ajouter/supprimer des photos de la galerie
- **Paramètres** : Configuration du site (à développer)

## Configuration

### Variables d'environnement (.env)
Aucune configuration nécessaire pour démarrer. Le fichier `.env` est optionnel pour cette version.

### Personnalisation des couleurs
Les couleurs sont définies dans `tailwind.config.ts` et `app/globals.css` :
- Rose principal : `#FFB6D9`
- Bleu principal : `#B6D4FF`
- Rose accent : `#FF69B4`
- Bleu accent : `#4A90E2`

## Structure du Projet

```
├── app/
│   ├── page.tsx              # Page d'accueil
│   ├── gallery/              # Page galerie
│   ├── pricing/              # Page tarifs
│   ├── contact/              # Page contact
│   ├── admin/                # Panel d'administration
│   └── api/
│       └── contact/          # API pour le formulaire
├── components/
│   ├── Navbar.tsx            # Barre de navigation
│   ├── Footer.tsx            # Pied de page
│   └── Button.tsx            # Composant bouton réutilisable
├── lib/
│   └── auth.ts               # Utilitaires d'authentification
├── prisma/
│   └── schema.prisma         # Schéma de base de données
└── public/
    └── images/               # Images statiques
```

## Déploiement

### Sur Vercel (Recommandé)
1. Pushez votre code sur GitHub
2. Connectez votre repo à [Vercel](https://vercel.com)
3. Configurez les variables d'environnement
4. Déployez !

### Build de production
```bash
npm run build
npm run start
```

## Améliorations Futures

- [ ] Intégration d'une vraie base de données (PostgreSQL/MongoDB)
- [ ] Système d'authentification JWT sécurisé
- [ ] Upload d'images direct depuis l'admin avec stockage cloud (Cloudinary/S3)
- [ ] Système de réservation en ligne avec calendrier
- [ ] Newsletter et marketing par email
- [ ] Galerie avec chargement lazy et pagination
- [ ] Mode sombre (optionnel)
- [ ] Multi-langue (FR/EN)
- [ ] Analytics et suivi des conversions

## Sécurité

⚠️ **Important pour la production** :
1. Changez le mot de passe admin par défaut (actuellement en dur dans le code)
2. Implémentez une vraie authentification avec JWT et base de données
3. Utilisez une base de données (PostgreSQL, MongoDB) au lieu de fichiers JSON
4. Configurez HTTPS et les en-têtes de sécurité
5. Implémentez un système de limitation de débit (rate limiting)
6. Ajoutez une protection CSRF pour les formulaires
7. Utilisez des variables d'environnement pour les secrets

## Support

Pour toute question ou assistance :
- Email : contact@studioboudoir.com
- Documentation Next.js : [https://nextjs.org/docs](https://nextjs.org/docs)

## Licence

Ce projet est un site web personnalisé pour Studio Boudoir.

---

Développé avec ❤️ en utilisant Next.js et les meilleures pratiques web modernes.
