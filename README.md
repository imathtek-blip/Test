# FreeTube Modern

Une version web moderne et privacy-focused du lecteur YouTube, inspirée de FreeTube. Regardez vos vidéos YouTube préférées sans publicités ni tracking.

## Fonctionnalités

- **Sans publicité** : Profitez de vos vidéos sans interruption
- **Respect de la vie privée** : Pas de tracking, pas de cookies Google
- **Abonnements locaux** : Gérez vos abonnements sans compte Google
- **Historique** : Historique de visionnage stocké localement
- **Recherche avancée** : Recherchez des vidéos, chaînes et playlists
- **Tendances** : Découvrez les vidéos populaires
- **Mode sombre** : Interface sombre pour vos yeux
- **Design moderne** : Interface élégante et responsive
- **100% Open Source** : Code source ouvert et transparent

## Technologies

- **Next.js 16** - Framework React moderne
- **TypeScript** - Typage statique
- **Tailwind CSS** - Design system moderne
- **Invidious API** - API YouTube alternative privacy-focused
- **LocalStorage** - Stockage local des données utilisateur
- **Framer Motion** - Animations fluides

## Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build
npm start
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Configuration

Par défaut, l'application utilise l'instance Invidious publique. Vous pouvez configurer votre propre instance dans `.env.local` :

```env
NEXT_PUBLIC_INVIDIOUS_INSTANCE=https://invidious.fdn.fr
```

## Fonctionnalités Principales

### Player Vidéo
- Lecteur vidéo HTML5 personnalisé
- Qualité ajustable
- Mode théâtre et plein écran
- Lecture automatique de la vidéo suivante

### Abonnements
- Abonnez-vous à des chaînes sans compte Google
- Flux d'abonnements personnalisé
- Notifications de nouvelles vidéos
- Stockage 100% local

### Recherche
- Recherche instantanée
- Filtres avancés (durée, date, type)
- Suggestions de recherche
- Historique de recherche

### Privacy First
- Aucune donnée envoyée à Google
- Pas de cookies de tracking
- Proxy pour les vidéos
- Données stockées localement uniquement

## Structure du Projet

```
├── app/
│   ├── page.tsx                 # Page d'accueil (tendances)
│   ├── watch/[id]/              # Player vidéo
│   ├── search/                  # Recherche
│   ├── channel/[id]/            # Page chaîne
│   ├── subscriptions/           # Abonnements
│   ├── history/                 # Historique
│   └── trending/                # Tendances
├── components/
│   ├── VideoPlayer.tsx          # Player vidéo
│   ├── VideoCard.tsx            # Carte vidéo
│   ├── Navbar.tsx               # Navigation
│   ├── Sidebar.tsx              # Menu latéral
│   └── SubscribeButton.tsx      # Bouton d'abonnement
├── lib/
│   ├── youtube-api.ts           # Utilitaires API YouTube/Invidious
│   ├── storage.ts               # Gestion LocalStorage
│   ├── types.ts                 # Types TypeScript
│   └── context/                 # Contextes React
└── public/
    └── images/                  # Assets
```

## Utilisation

### Regarder une vidéo
Naviguez vers `/watch/[videoId]` ou cliquez sur une vidéo dans l'interface.

### Gérer les abonnements
1. Visitez une page de chaîne
2. Cliquez sur "S'abonner"
3. Les nouvelles vidéos apparaîtront dans votre flux

### Rechercher
Utilisez la barre de recherche en haut ou visitez `/search`

## Déploiement

### Vercel (Recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Docker
```bash
# Build
docker build -t freetube-modern .

# Run
docker run -p 3000:3000 freetube-modern
```

## Comparaison avec FreeTube Original

| Fonctionnalité | FreeTube (Desktop) | FreeTube Modern (Web) |
|----------------|--------------------|-----------------------|
| Plateforme | Electron (Desktop) | Web (tous navigateurs) |
| Installation | Téléchargement | Accès instantané |
| Taille | ~200MB | ~2MB |
| Mises à jour | Manuel | Automatique |
| Multi-fenêtres | Oui | Onglets navigateur |
| Import abonnements | Oui | À venir |

## API et Limites

L'application utilise l'API Invidious qui peut avoir des limites de taux. Si vous rencontrez des problèmes :

1. Changez d'instance Invidious dans les paramètres
2. Hébergez votre propre instance Invidious
3. Utilisez l'API YouTube Data v3 (nécessite une clé API)

## Contribuer

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Roadmap

- [ ] Import/Export abonnements depuis FreeTube
- [ ] Support des playlists
- [ ] Commentaires
- [ ] Sous-titres et traductions
- [ ] Téléchargement de vidéos
- [ ] Mode Picture-in-Picture
- [ ] Raccourcis clavier avancés
- [ ] Thèmes personnalisables
- [ ] PWA (Progressive Web App)
- [ ] Support SponsorBlock

## Sécurité et Privacy

- **Aucune donnée utilisateur envoyée à des serveurs tiers**
- **Toutes les données stockées localement dans votre navigateur**
- **Pas de cookies de tracking**
- **Pas d'analytics**
- **Code source 100% auditable**

## Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

## Remerciements

- [FreeTube](https://github.com/FreeTubeApp/FreeTube) - L'application desktop originale
- [Invidious](https://github.com/iv-org/invidious) - L'API YouTube alternative
- [NewPipe](https://newpipe.net/) - Inspiration pour le design mobile

## Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Consultez la documentation
- Rejoignez notre communauté

---

**Disclaimer** : Ce projet n'est pas affilié à YouTube, Google, ou FreeTube. C'est un projet indépendant open-source créé pour promouvoir la vie privée en ligne.

Développé avec ❤️ pour la communauté privacy-focused.
