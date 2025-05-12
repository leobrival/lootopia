# Backlog

Later: Mettre en avant l'aspect communautaire et la collaboration avec des partenaires, laisser la possibilité de créer des chasses aux joueurs et aux partenaires.

## THEME: Expérience joueur

### Epic: Gestion des comptes & Profils (NFT Custom Avatar)

#### User Story: Créer un compte avec email et mot de passe

Capabilities: [auth, profile]

- En tant qu'utilisateur, je veux créer un compte avec email et mot de passe

Estimation: XS
Priorité: Must
Type: Front + Back
Dépendances:

#### User Story: Se connecter à son compte

Capabilities: [auth]

- En tant qu'utilisateur, je veux me connecter à mon compte existant

Estimation: XS
Priorité: Must
Type: Front + Back
Dépendances: Créer un compte avec email et mot de passe

#### User Story: Personnaliser son profil

Capabilities: [profile]

- En tant qu'utilisateur, je veux personnaliser mon profil avec avatar et pseudo

Estimation: S
Priorité: Should
Type: Front + Back
Dépendances: Créer un compte avec email et mot de passe

#### User Story: Récupérer son mot de passe oublié

Capabilities: [auth]

- En tant qu'utilisateur, je veux récupérer mon mot de passe oublié

Estimation: XS
Priorité: Must
Type: Front + Back
Dépendances: Créer un compte avec email et mot de passe

#### User Story: Me connecter via Google/Facebook

Capabilities: [auth, social]

- En tant qu'utilisateur, je veux me connecter via Google/Facebook

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances:

#### User Story: Modifier mes informations personnelles

Capabilities: [profile]

- En tant qu'utilisateur, je veux modifier mes informations personnelles

Estimation: XS
Priorité: Should
Type: Front + Back
Dépendances: Créer un compte avec email et mot de passe

#### User Story: Supprimer mon compte

Capabilities: [auth, profile]

- En tant qu'utilisateur, je veux supprimer mon compte

Estimation: S
Priorité: Could
Type: Front + Back
Dépendances: Créer un compte avec email et mot de passe

#### User Story: Gérer mes paramètres de confidentialité

Capabilities: [profile]

- En tant qu'utilisateur, je veux gérer mes paramètres de confidentialité

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances: Créer un compte avec email et mot de passe

#### User Story: Voir mon historique de chasses

Capabilities: [content-management, analytics]

- En tant qu'utilisateur, je veux voir mon historique de chasses

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances: Créer un compte avec email et mot de passe

#### User Story: Lier mes réseaux sociaux à mon profil

Capabilities: [profile, social]

- En tant qu'utilisateur, je veux lier mes réseaux sociaux à mon profil

Estimation: S
Priorité: Could
Type: Front + Back
Dépendances: Créer un compte avec email et mot de passe

### Epic: Onboarding & Tutoriel

#### User Story: Tutoriel interactif pour comprendre le jeu

Capabilities: [onboarding]

- En tant que nouvel utilisateur, je veux un tutoriel interactif pour comprendre le jeu

Estimation: M
Priorité: Must
Type: Front
Dépendances:

#### User Story: Apprendre à créer ma première cache

Capabilities: [onboarding, content-creation]

- En tant que nouvel utilisateur, je veux apprendre à créer ma première cache

Estimation: S
Priorité: Could
Type: Front
Dépendances: Tutoriel interactif pour comprendre le jeu

#### User Story: Comprendre le système de récompenses

Capabilities: [onboarding, reward]

- En tant que nouvel utilisateur, je veux comprendre le système de récompenses

Estimation: S
Priorité: Must
Type: Front
Dépendances: Tutoriel interactif pour comprendre le jeu

#### User Story: Savoir comment compléter une chasse

Capabilities: [onboarding, content-management]

- En tant que nouvel utilisateur, je veux savoir comment compléter une chasse

Estimation: S
Priorité: Must
Type: Front
Dépendances: Tutoriel interactif pour comprendre le jeu

#### User Story: Découvrir les fonctionnalités de base

Capabilities: [onboarding]

- En tant que nouvel utilisateur, je veux découvrir les fonctionnalités de base

Estimation: S
Priorité: Must
Type: Front
Dépendances: Tutoriel interactif pour comprendre le jeu

#### User Story: Accéder aux tutoriels à tout moment

Capabilities: [onboarding]

- En tant que nouvel utilisateur, je veux accéder aux tutoriels à tout moment

Estimation: XS
Priorité: Should
Type: Front
Dépendances: Tutoriel interactif pour comprendre le jeu

#### User Story: Conseils contextuels durant mes premières actions

Capabilities: [onboarding]

- En tant que nouvel utilisateur, je veux des conseils contextuels durant mes premières actions

Estimation: M
Priorité: Should
Type: Front
Dépendances: Tutoriel interactif pour comprendre le jeu

#### User Story: FAQ des questions communes

Capabilities: [onboarding]

- En tant que nouvel utilisateur, je veux voir une FAQ des questions communes

Estimation: S
Priorité: Could
Type: Front
Dépendances:

#### User Story: Des vidéos explicatives

Capabilities: [onboarding]

- En tant que nouvel utilisateur, je veux des vidéos explicatives

Estimation: M
Priorité: Could
Type: Front
Dépendances:

#### User Story: Passer le tutoriel si je suis déjà familier

Capabilities: [onboarding]

- En tant que nouvel utilisateur, je veux passer le tutoriel si je suis déjà familier

Estimation: XS
Priorité: Should
Type: Front
Dépendances: Tutoriel interactif pour comprendre le jeu

### Epic: Système de niveau et d'expérience

#### User Story: Gagner des points d'expérience en complétant des chasses

Capabilities: [gamification, reward, content-management]

- En tant qu'utilisateur, je veux gagner des points d'expérience en complétant des chasses

Estimation: M
Priorité: Must
Type: Back + Front
Dépendances: Voir mon solde de monnaie virtuelle, Recevoir des notifications push sur mon téléphone, Créer une chasse au trésor simple

#### User Story: Monter de niveau grâce à mes actions

Capabilities: [gamification, reward]

- En tant qu'utilisateur, je veux monter de niveau grâce à mes actions

Estimation: M
Priorité: Must
Type: Back + Front
Dépendances: Gagner des points d'expérience en complétant des chasses

#### User Story: Voir ma progression actuelle

Capabilities: [gamification, analytics]

- En tant qu'utilisateur, je veux voir ma progression actuelle

Estimation: S
Priorité: Must
Type: Front
Dépendances: Monter de niveau grâce à mes actions

#### User Story: Débloquer de nouvelles fonctionnalités avec mon niveau

Capabilities: [gamification]

- En tant qu'utilisateur, je veux débloquer de nouvelles fonctionnalités avec mon niveau

Estimation: M
Priorité: Should
Type: Back + Front
Dépendances: Monter de niveau grâce à mes actions

#### User Story: Consulter les avantages du niveau suivant

Capabilities: [gamification]

- En tant qu'utilisateur, je veux consulter les avantages du niveau suivant

Estimation: S
Priorité: Should
Type: Front
Dépendances: Monter de niveau grâce à mes actions

#### User Story: Des défis quotidiens pour gagner de l'XP

Capabilities: [gamification, reward]

- En tant qu'utilisateur, je veux des défis quotidiens pour gagner de l'XP

Estimation: M
Priorité: Could
Type: Back + Front
Dépendances: Gagner des points d'expérience en complétant des chasses

#### User Story: Compare mon niveau avec d'autres joueurs

Capabilities: [gamification, analytics, social]

- En tant qu'utilisateur, je veux comparer mon niveau avec d'autres joueurs

Estimation: M
Priorité: Could
Type: Back + Front
Dépendances: Monter de niveau grâce à mes actions

#### User Story: Des badges pour mes accomplissements

Capabilities: [gamification, reward]

- En tant qu'utilisateur, je veux des badges pour mes accomplissements

Estimation: M
Priorité: Could
Type: Back + Front
Dépendances: Monter de niveau grâce à mes actions

#### User Story: Historique de mes points gagnés

Capabilities: [gamification, analytics]

- En tant qu'utilisateur, je veux voir l'historique de mes points gagnés

Estimation: S
Priorité: Could
Type: Back + Front
Dépendances: Gagner des points d'expérience en complétant des chasses

#### User Story: Récompenses spéciales à certains paliers

Capabilities: [gamification, reward]

- En tant qu'utilisateur, je veux des récompenses spéciales à certains paliers

Estimation: M
Priorité: Should
Type: Back + Front
Dépendances: Monter de niveau grâce à mes actions

### Epic: Récompenses quotidiennes (Flamme Snapchat)

#### User Story: Recevoir une récompense pour ma connexion quotidienne

Capabilities: [reward, gamification]

- En tant qu'utilisateur, je veux recevoir une récompense pour ma connexion quotidienne

Estimation: S
Priorité: Should
Type: Back + Front
Dépendances:

#### User Story: Un calendrier de récompenses progressives

Capabilities: [reward, gamification]

- En tant qu'utilisateur, je veux un calendrier de récompenses progressives

Estimation: M
Priorité: Should
Type: Back + Front
Dépendances: Recevoir une récompense pour ma connexion quotidienne

#### User Story: Être notifié de ma récompense disponible

Capabilities: [reward, notification]

- En tant qu'utilisateur, je veux être notifié de ma récompense disponible

Estimation: XS
Priorité: Should
Type: Back + Front
Dépendances: Recevoir une récompense pour ma connexion quotidienne

#### User Story: Des bonus pour les connexions consécutives

Capabilities: [reward, gamification]

- En tant qu'utilisateur, je veux des bonus pour les connexions consécutives

Estimation: XS
Priorité: Should
Type: Back + Front
Dépendances: Recevoir une récompense pour ma connexion quotidienne

#### User Story: Voir le temps restant avant la prochaine récompense

Capabilities: [reward, gamification]

- En tant qu'utilisateur, je veux voir le temps restant avant la prochaine récompense

Estimation: XS
Priorité: Should
Type: Front
Dépendances: Recevoir une récompense pour ma connexion quotidienne

#### User Story: Des récompenses spéciales les week-ends

Capabilities: [reward, gamification]

- En tant qu'utilisateur, je veux des récompenses spéciales les week-ends

Estimation: S
Priorité: Could
Type: Back + Front
Dépendances: Recevoir une récompense pour ma connexion quotidienne

#### User Story: Rattraper une récompense manquée

Capabilities: [reward, gamification]

- En tant qu'utilisateur, je veux rattraper une récompense manquée

Estimation: M
Priorité: Could
Type: Back + Front
Dépendances: Recevoir une récompense pour ma connexion quotidienne

#### User Story: Échanger des récompenses contre d'autres items

Capabilities: [reward]

- En tant qu'utilisateur, je veux échanger des récompenses contre d'autres items

Estimation: M
Priorité: Won't
Type: Back + Front
Dépendances: Recevoir une récompense pour ma connexion quotidienne

#### User Story: Partager mes récompenses sur les réseaux sociaux

Capabilities: [reward, social]

- En tant qu'utilisateur, je veux partager mes récompenses sur les réseaux sociaux

Estimation: S
Priorité: Could
Type: Front
Dépendances: Recevoir une récompense pour ma connexion quotidienne, Lier mes réseaux sociaux à mon profil

#### User Story: Des récompenses exclusives lors d'événements

Capabilities: [reward, gamification]

- En tant qu'utilisateur, je veux des récompenses exclusives lors d'événements

Estimation: M
Priorité: Could
Type: Back + Front
Dépendances: Recevoir une récompense pour ma connexion quotidienne

### Epic: Système de notifications

#### User Story: Être notifié quand quelqu'un trouve ma cache

Capabilities: [notification, content-management]

- En tant qu'utilisateur, je veux être notifié quand quelqu'un trouve ma cache

Estimation: S
Priorité: Must
Type: Back + Front
Dépendances: Recevoir des notifications push sur mon téléphone

#### User Story: Être alerté des nouvelles chasses près de moi

Capabilities: [notification, content-management]

- En tant qu'utilisateur, je veux être alerté des nouvelles chasses près de moi

Estimation: S
Priorité: Could
Type: Back + Front
Dépendances: Recevoir des notifications push sur mon téléphone

#### User Story: Recevoir des notifications push sur mon téléphone

Capabilities: [notification]

- En tant qu'utilisateur, je veux recevoir des notifications push sur mon téléphone

Estimation: M
Priorité: Must
Type: Back + Front
Dépendances:

#### User Story: Personnaliser les types de notifications reçues

Capabilities: [notification]

- En tant qu'utilisateur, je veux personnaliser les types de notifications reçues

Estimation: M
Priorité: Should
Type: Back + Front
Dépendances: Recevoir des notifications push sur mon téléphone

#### User Story: Être notifié des récompenses disponibles

Capabilities: [notification, reward]

- En tant qu'utilisateur, je veux être notifié des récompenses disponibles

Estimation: S
Priorité: Should
Type: Back + Front
Dépendances: Recevoir une récompense pour ma connexion quotidienne, Recevoir des notifications push sur mon téléphone

#### User Story: Être informé des messages reçus

Capabilities: [notification, social]

- En tant qu'utilisateur, je veux être informé des messages reçus

Estimation: S
Priorité: Should
Type: Back + Front
Dépendances: Recevoir une récompense pour ma connexion quotidienne, Recevoir des notifications push sur mon téléphone

#### User Story: Voir un centre de notifications dans l'app

Capabilities: [notification]

- En tant qu'utilisateur, je veux voir un centre de notifications dans l'app

Estimation: M
Priorité: Must
Type: Front
Dépendances: Recevoir des notifications push sur mon téléphone

#### User Story: Désactiver temporairement les notifications

Capabilities: [notification]

- En tant qu'utilisateur, je veux désactiver temporairement les notifications

Estimation: S
Priorité: Should
Type: Back + Front
Dépendances: Recevoir des notifications push sur mon téléphone

#### User Story: Recevoir des notifications par email

Capabilities: [notification]

- En tant qu'utilisateur, je veux recevoir des notifications par email

Estimation: M
Priorité: Could
Type: Back
Dépendances:

#### User Story: être notifié des mises à jour importantes

Capabilities: [notification]

- En tant qu'utilisateur, je veux être notifié des mises à jour importantes

Estimation: S
Priorité: Should
Type: Back + Front
Dépendances: Recevoir des notifications push sur mon téléphone

### Epic: Dashboard global (Metrics)

#### User Story: Voir le nombre total de chasses complétées

Capabilities: [analytics, content-management]

- En tant qu'utilisateur, je veux voir le nombre total de chasses complétées

Estimation: S
Priorité: Should
Type: Back + Front
Dépendances:

#### User Story: Consulter ma distance totale parcourue

Capabilities: [analytics]

- En tant qu'utilisateur, je veux consulter ma distance totale parcourue

Estimation: M
Priorité: Should
Type: Back + Front
Dépendances:

#### User Story: Visualiser mes statistiques sous forme de graphiques

Capabilities: [analytics]

- En tant qu'utilisateur, je veux visualiser mes statistiques sous forme de graphiques

Estimation: M
Priorité: Could
Type: Front
Dépendances: Voir le nombre total de chasses complétées

#### User Story: Voir mon classement parmi les autres joueurs

Capabilities: [analytics, gamification, social]

- En tant qu'utilisateur, je veux voir mon classement parmi les autres joueurs

Estimation: M
Priorité: Could
Type: Back + Front
Dépendances:

#### User Story: Consulter mes artefacts collectionnés

Capabilities: [analytics, blockchain]

- En tant qu'utilisateur, je veux consulter mes artefacts collectionnés

Estimation: M
Priorité: Must
Type: Back + Front
Dépendances: Collecter des artefacts uniques (NFT), Voir le nombre total de chasses complétées

#### User Story: Suivre mes objectifs personnels

Capabilities: [analytics, gamification]

- En tant qu'utilisateur, je veux suivre mes objectifs personnels

Estimation: M
Priorité: Must
Type: Back + Front
Dépendances:

#### User Story: Voir mes réalisations récentes

Capabilities: [analytics, gamification]

- En tant qu'utilisateur, je veux voir mes réalisations récentes

Estimation: S
Priorité: Should
Type: Back + Front
Dépendances:

#### User Story: Exporter mes statistiques

Capabilities: [analytics]

- En tant qu'utilisateur, je veux exporter mes statistiques

Estimation: L
Priorité: Won't
Type: Back + Front
Dépendances: Visualiser mes statistiques sous forme de graphiques

#### User Story: Personnaliser mon tableau de bord

Capabilities: [analytics]

- En tant qu'utilisateur, je veux personnaliser mon tableau de bord

Estimation: L
Priorité: Won't
Type: Front
Dépendances: Visualiser mes statistiques sous forme de graphiques

#### User Story: Des suggestions basées sur mes statistiques

Capabilities: [analytics]

- En tant qu'utilisateur, je veux des suggestions basées sur mes statistiques

Estimation: L
Priorité: Could
Type: Back + Front
Dépendances: Visualiser mes statistiques sous forme de graphiques

## THEME: Création & Gestion de contenu

### Epic: Création de chasses standard

#### User Story: Créer une chasse au trésor simple

Capabilities: [content-creation]

- En tant qu'utilisateur, je veux créer une chasse au trésor simple

Estimation: M
Priorité: Must
Type: Back + Front
Dépendances:

#### User Story: Définir l'emplacement d'une cache sur la carte

Capabilities: [content-creation, map]

- En tant qu'utilisateur, je veux définir l'emplacement d'une cache sur la carte

Estimation: S
Priorité: Must
Type: Front
Dépendances: Créer une chasse au trésor simple

#### User Story: Ajouter des indices pour ma chasse

Capabilities: [content-creation]

- En tant qu'utilisateur, je veux ajouter des indices pour ma chasse

Estimation: S
Priorité: Must
Type: Front + Back
Dépendances: Créer une chasse au trésor simple

#### User Story: Associer une énigme à ma cache

Capabilities: [content-creation, puzzle]

- En tant qu'utilisateur, je veux associer une énigme à ma cache

Estimation: M
Priorité: Must
Type: Front + Back
Dépendances: Créer une chasse au trésor simple

#### User Story: Définir la difficulté de ma chasse

Capabilities: [content-creation, gamification]

- En tant qu'utilisateur, je veux définir la difficulté de ma chasse

Estimation: XS
Priorité: Must
Type: Front + Back
Dépendances: Créer une chasse au trésor simple

#### User Story: Ajouter des photos à ma cache

Capabilities: [content-creation, media]

- En tant qu'utilisateur, je veux ajouter des photos à ma cache

Estimation: S
Priorité: Should
Type: Front + Back
Dépendances: Créer une chasse au trésor simple

#### User Story: Prévisualiser ma chasse avant publication

Capabilities: [content-creation]

- En tant qu'utilisateur, je veux prévisualiser ma chasse avant publication

Estimation: M
Priorité: Should
Type: Front
Dépendances: Créer une chasse au trésor simple

#### User Story: Modifier une chasse existante

Capabilities: [content-management]

- En tant qu'utilisateur, je veux modifier une chasse existante

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances: Créer une chasse au trésor simple

#### User Story: Dupliquer une chasse existante

Capabilities: [content-management]

- En tant qu'utilisateur, je veux dupliquer une chasse existante

Estimation: S
Priorité: Could
Type: Front + Back
Dépendances: Créer une chasse au trésor simple

#### User Story: Définir un rayon de proximité pour ma cache

Capabilities: [content-creation, map]

- En tant qu'utilisateur, je veux définir un rayon de proximité pour ma cache

Estimation: S
Priorité: Must
Type: Front + Back
Dépendances: Créer une chasse au trésor simple

### Epic: Création de chasses personnalisées

#### User Story: Créer une chasse avec plusieurs étapes

Capabilities: [content-creation]

- En tant qu'utilisateur, je veux créer une chasse avec plusieurs étapes

Estimation: L
Priorité: Should
Type: Front + Back
Dépendances: Créer une chasse au trésor simple

#### User Story: Définir un parcours spécifique pour ma chasse

Capabilities: [content-creation, map]

- En tant qu'utilisateur, je veux définir un parcours spécifique pour ma chasse

Estimation: L
Priorité: Should
Type: Front + Back
Dépendances: Créer une chasse avec plusieurs étapes

#### User Story: Intégrer des éléments de réalité augmentée

Capabilities: [content-creation, ar]

- En tant qu'utilisateur, je veux intégrer des éléments de réalité augmentée

Estimation: XL
Priorité: Could
Type: Front
Dépendances: Créer une chasse avec plusieurs étapes

#### User Story: Ajouter des conditions temporelles

Capabilities: [content-creation, gamification]

- En tant qu'utilisateur, je veux ajouter des conditions temporelles

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Créer une chasse avec plusieurs étapes

#### User Story: Personnaliser l'apparence visuelle de ma chasse

Capabilities: [content-creation, media]

- En tant qu'utilisateur, je veux personnaliser l'apparence visuelle de ma chasse

Estimation: L
Priorité: Could
Type: Front
Dépendances: Créer une chasse avec plusieurs étapes

#### User Story: Définir des récompenses spécifiques

Capabilities: [content-creation, reward]

- En tant qu'utilisateur, je veux définir des récompenses spécifiques

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances: Créer une chasse avec plusieurs étapes

#### User Story: Limiter ma chasse à un groupe spécifique

Capabilities: [content-creation, social]

- En tant qu'utilisateur, je veux limiter ma chasse à un groupe spécifique

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances: Créer une chasse avec plusieurs étapes

#### User Story: Créer une chasse thématique

Capabilities: [content-creation]

- En tant qu'utilisateur, je veux créer une chasse thématique

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Créer une chasse avec plusieurs étapes

#### User Story: Ajouter du contenu audio à ma chasse

Capabilities: [content-creation, media]

- En tant qu'utilisateur, je veux ajouter du contenu audio à ma chasse

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Créer une chasse avec plusieurs étapes

#### User Story: Créer une chasse éducative avec quiz

Capabilities: [content-creation, gamification, quiz]

- En tant qu'utilisateur, je veux créer une chasse éducative avec quiz

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances: Créer une chasse avec plusieurs étapes

### Epic: Gestion des énigmes

#### User Story: Créer des énigmes textuelles simples

Capabilities: [puzzle, content-creation]

- En tant qu'utilisateur, je veux créer des énigmes textuelles simples

Estimation: S
Priorité: Must
Type: Front + Back
Dépendances:

#### User Story: Associer des indices visuels à mes énigmes

Capabilities: [puzzle, media]

- En tant qu'utilisateur, je veux associer des indices visuels à mes énigmes

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances: Créer des énigmes textuelles simples

#### User Story: Choisir parmi des modèles d'énigmes prédéfinis

Capabilities: [puzzle]

- En tant qu'utilisateur, je veux choisir parmi des modèles d'énigmes prédéfinis

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances: Créer des énigmes textuelles simples

#### User Story: Définir plusieurs niveaux d'indices

Capabilities: [puzzle]

- En tant qu'utilisateur, je veux définir plusieurs niveaux d'indices

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances: Créer des énigmes textuelles simples

#### User Story: Créer des énigmes avec plusieurs solutions valides

Capabilities: [puzzle]

- En tant qu'utilisateur, je veux créer des énigmes avec plusieurs solutions valides

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Créer des énigmes textuelles simples

#### User Story: Tester la résolution de mon énigme

Capabilities: [puzzle]

- En tant qu'utilisateur, je veux tester la résolution de mon énigme

Estimation: S
Priorité: Must
Type: Front + Back
Dépendances: Créer des énigmes textuelles simples

#### User Story: Importer des énigmes existantes

Capabilities: [puzzle]

- En tant qu'utilisateur, je veux importer des énigmes existantes

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Créer des énigmes textuelles simples

#### User Story: Noter la difficulté perçue des énigmes

Capabilities: [puzzle, gamification]

- En tant qu'utilisateur, je veux noter la difficulté perçue des énigmes

Estimation: S
Priorité: Could
Type: Front + Back
Dépendances: Créer des énigmes textuelles simples

#### User Story: Créer des énigmes qui nécessitent l'observation du lieu réel

Capabilities: [puzzle, content-creation, map]

- En tant qu'utilisateur, je veux créer des énigmes qui nécessitent l'observation du lieu réel

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances: Créer des énigmes textuelles simples

#### User Story: Un historique de mes énigmes créées

Capabilities: [puzzle, analytics]

- En tant qu'utilisateur, je veux un historique de mes énigmes créées

Estimation: S
Priorité: Could
Type: Front + Back
Dépendances: Créer des énigmes textuelles simples

### Epic: Modération du contenu (Utilisateur)

#### User Story: Signaler un contenu inapproprié

Capabilities: [moderation]

- En tant qu'utilisateur, je veux signaler un contenu inapproprié

Estimation: S
Priorité: Must
Type: Front + Back
Dépendances:

#### User Story: Noter la qualité des chasses complétées

Capabilities: [moderation, analytics]

- En tant qu'utilisateur, je veux noter la qualité des chasses complétées

Estimation: S
Priorité: Should
Type: Front + Back
Dépendances:

#### User Story: Laisser un commentaire sur une chasse

Capabilities: [moderation, social]

- En tant qu'utilisateur, je veux laisser un commentaire sur une chasse

Estimation: S
Priorité: Should
Type: Front + Back
Dépendances:

#### User Story: Signaler une cache introuvable

Capabilities: [moderation]

- En tant qu'utilisateur, je veux signaler une cache introuvable

Estimation: S
Priorité: Must
Type: Front + Back
Dépendances:

#### User Story: Contester une modération

Capabilities: [moderation]

- En tant qu'utilisateur, je veux contester une modération

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances: Signaler un contenu inapproprié

#### User Story: Voir l'état de modération de mes chasses

Capabilities: [moderation]

- En tant qu'utilisateur, je veux voir l'état de modération de mes chasses

Estimation: S
Priorité: Should
Type: Front + Back
Dépendances: Signaler un contenu inapproprié

#### User Story: Recevoir des notifications de modération

Capabilities: [moderation, notification]

- En tant qu'utilisateur, je veux recevoir des notifications de modération

Estimation: S
Priorité: Should
Type: Front + Back
Dépendances: Signaler un contenu inapproprié, Recevoir des notifications push sur mon téléphone

#### User Story: Filtrer les chasses par évaluation

Capabilities: [moderation, content-management]

- En tant qu'utilisateur, je veux filtrer les chasses par évaluation

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances:

#### User Story: Voir les règles de modération

Capabilities: [moderation]

- En tant qu'utilisateur, je veux voir les règles de modération

Estimation: XS
Priorité: Must
Type: Front
Dépendances:

#### User Story: Système de reconnaissance des contributeurs fiables

Capabilities: [moderation, social]

- En tant qu'utilisateur, je veux un système de reconnaissance des contributeurs fiables

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances:

## THEME: Écosystème & économique

### Epic: Wallet & Transactions

#### User Story: Voir mon solde de monnaie virtuelle

Capabilities: [wallet]

- En tant qu'utilisateur, je veux voir mon solde de monnaie virtuelle

Estimation: S
Priorité: Must
Type: Front + Back
Dépendances:

#### User Story: Gagner de la monnaie en complétant des chasses

Capabilities: [wallet, reward, content-management]

- En tant qu'utilisateur, je veux gagner de la monnaie en complétant des chasses

Estimation: M
Priorité: Must
Type: Back
Dépendances: Voir mon solde de monnaie virtuelle, Recevoir des notifications push sur mon téléphone, Créer une chasse au trésor simple

#### User Story: Dépenser ma monnaie pour des objets virtuels

Capabilities: [wallet, reward]

- En tant qu'utilisateur, je veux dépenser ma monnaie pour des objets virtuels

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances: Voir mon solde de monnaie virtuelle

#### User Story: Consulter l'historique de mes transactions

Capabilities: [wallet, analytics]

- En tant qu'utilisateur, je veux consulter l'historique de mes transactions

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances: Voir mon solde de monnaie virtuelle

#### User Story: Transférer de la monnaie à d'autres utilisateurs

Capabilities: [wallet, social]

- En tant qu'utilisateur, je veux transférer de la monnaie à d'autres utilisateurs

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances: Voir mon solde de monnaie virtuelle

#### User Story: Acheter de la monnaie avec de l'argent réel

Capabilities: [wallet]

- En tant qu'utilisateur, je veux acheter de la monnaie avec de l'argent réel

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances: Voir mon solde de monnaie virtuelle

#### User Story: Des notifications pour mes transactions

Capabilities: [wallet, notification]

- En tant qu'utilisateur, je veux des notifications pour mes transactions

Estimation: S
Priorité: Should
Type: Front + Back
Dépendances: Voir mon solde de monnaie virtuelle

#### User Story: Sécuriser mon wallet avec authentification

Capabilities: [wallet, auth]

- En tant qu'utilisateur, je veux sécuriser mon wallet avec authentification

Estimation: M
Priorité: Must
Type: Front + Back
Dépendances: Voir mon solde de monnaie virtuelle, Créer un compte avec email et mot de passe

#### User Story: Récupérer mon wallet en cas de perte d'accès

Capabilities: [wallet, auth]

- En tant qu'utilisateur, je veux récupérer mon wallet en cas de perte d'accès

Estimation: M
Priorité: Must
Type: Back
Dépendances: Sécuriser mon wallet avec authentification

#### User Story: Définir des limites de dépenses

Capabilities: [wallet]

- En tant qu'utilisateur, je veux définir des limites de dépenses

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Sécuriser mon wallet avec authentification

### Epic: Blockchain & NFT

#### User Story: Collecter des artefacts uniques (NFT)

Capabilities: [blockchain, reward]

- En tant qu'utilisateur, je veux collecter des artefacts uniques (NFT)

Estimation: L
Priorité: Should
Type: Front + Back + Blockchain
Dépendances:

#### User Story: Voir ma collection d'artefacts

Capabilities: [blockchain, analytics]

- En tant qu'utilisateur, je veux voir ma collection d'artefacts

Estimation: M
Priorité: Should
Type: Front + Blockchain
Dépendances: Collecter des artefacts uniques (NFT)

#### User Story: Obtenir un certificat d'authenticité pour mes découvertes

Capabilities: [blockchain]

- En tant qu'utilisateur, je veux obtenir un certificat d'authenticité pour mes découvertes

Estimation: M
Priorité: Could
Type: Back + Blockchain
Dépendances: Collecter des artefacts uniques (NFT)

#### User Story: Échanger des artefacts avec d'autres joueurs

Capabilities: [blockchain, social]

- En tant qu'utilisateur, je veux échanger des artefacts avec d'autres joueurs

Estimation: L
Priorité: Could
Type: Front + Back + Blockchain
Dépendances: Collecter des artefacts uniques (NFT)

#### User Story: Connecter un wallet externe

Capabilities: [blockchain, wallet]

- En tant qu'utilisateur, je veux connecter un wallet externe

Estimation: L
Priorité: Could
Type: Front + Blockchain
Dépendances: Sécuriser mon wallet avec authentification

#### User Story: Comprendre la valeur de mes NFT

Capabilities: [blockchain, analytics]

- En tant qu'utilisateur, je veux comprendre la valeur de mes NFT

Estimation: M
Priorité: Could
Type: Front + Blockchain
Dépendances: Collecter des artefacts uniques (NFT)

#### User Story: Artefacts à édition limitée

Capabilities: [blockchain]

- En tant qu'utilisateur, je veux des artefacts à édition limitée

Estimation: M
Priorité: Could
Type: Back + Blockchain
Dépendances: Collecter des artefacts uniques (NFT)

#### User Story: Recevoir des NFT pour des événements spéciaux

Capabilities: [blockchain, reward]

- En tant qu'utilisateur, je veux recevoir des NFT pour des événements spéciaux

Estimation: M
Priorité: Won't
Type: Back + Blockchain
Dépendances: Collecter des artefacts uniques (NFT)

#### User Story: Exporter mes NFT vers d'autres plateformes

Capabilities: [blockchain]

- En tant qu'utilisateur, je veux exporter mes NFT vers d'autres plateformes

Estimation: XL
Priorité: Won't
Type: Back + Blockchain
Dépendances: Collecter des artefacts uniques (NFT)

#### User Story: Voir l'historique de propriété d'un artefact

Capabilities: [blockchain, analytics]

- En tant qu'utilisateur, je veux voir l'historique de propriété d'un artefact

Estimation: M
Priorité: Could
Type: Front + Blockchain
Dépendances: Collecter des artefacts uniques (NFT)

### Epic: Cartes cadeaux & Échanges

#### User Story: Échanger ma monnaie contre des cartes cadeaux

Capabilities: [giftcard, wallet]

- En tant qu'utilisateur, je veux échanger ma monnaie contre des cartes cadeaux

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances: Voir mon solde de monnaie virtuelle

#### User Story: Voir les cartes cadeaux disponibles

Capabilities: [giftcard]

- En tant qu'utilisateur, je veux voir les cartes cadeaux disponibles

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances:

#### User Story: Recevoir ma carte cadeau par email

Capabilities: [giftcard, notification]

- En tant qu'utilisateur, je veux recevoir ma carte cadeau par email

Estimation: M
Priorité: Could
Type: Back
Dépendances: Échanger ma monnaie contre des cartes cadeaux

#### User Story: Offrir une carte cadeau à un ami

Capabilities: [giftcard, social]

- En tant qu'utilisateur, je veux offrir une carte cadeau à un ami

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Échanger ma monnaie contre des cartes cadeaux

#### User Story: Échanger des points contre des réductions chez des partenaires

Capabilities: [giftcard, partner]

- En tant qu'utilisateur, je veux échanger des points contre des réductions chez des partenaires

Estimation: L
Priorité: Won't
Type: Front + Back
Dépendances: Voir mon solde de monnaie virtuelle

#### User Story: Être notifié des nouvelles offres d'échange

Capabilities: [giftcard, notification]

- En tant qu'utilisateur, je veux être notifié des nouvelles offres d'échange

Estimation: S
Priorité: Could
Type: Front + Back
Dépendances: Voir les cartes cadeaux disponibles

#### User Story: Consulter l'historique de mes échanges

Capabilities: [giftcard, analytics]

- En tant qu'utilisateur, je veux consulter l'historique de mes échanges

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Échanger ma monnaie contre des cartes cadeaux

#### User Story: Annuler un échange en cours

Capabilities: [giftcard]

- En tant qu'utilisateur, je veux annuler un échange en cours

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Échanger ma monnaie contre des cartes cadeaux

#### User Story: Des promotions sur les échanges lors d'événements

Capabilities: [giftcard]

- En tant qu'utilisateur, je veux des promotions sur les échanges lors d'événements

Estimation: M
Priorité: Won't
Type: Front + Back
Dépendances: Voir les cartes cadeaux disponibles

#### User Story: Un système de liste de souhaits pour futures récompenses

Capabilities: [giftcard, reward]

- En tant qu'utilisateur, je veux un système de liste de souhaits pour futures récompenses

Estimation: M
Priorité: Won't
Type: Front + Back
Dépendances: Voir les cartes cadeaux disponibles

### Epic: Système de récompenses

#### User Story: Gagner des récompenses pour mes découvertes

Capabilities: [reward]

- En tant qu'utilisateur, je veux gagner des récompenses pour mes découvertes

Estimation: M
Priorité: Must
Type: Back
Dépendances:

#### User Story: Des récompenses basées sur mon niveau d'activité

Capabilities: [reward, gamification]

- En tant qu'utilisateur, je veux des récompenses basées sur mon niveau d'activité

Estimation: M
Priorité: Should
Type: Back
Dépendances: Gagner des récompenses pour mes découvertes

#### User Story: Être récompensé pour la création de chasses populaires

Capabilities: [reward, content-creation]

- En tant qu'utilisateur, je veux être récompensé pour la création de chasses populaires

Estimation: M
Priorité: Should
Type: Back
Dépendances: Créer une chasse au trésor simple

#### User Story: Un système de récompenses progressives

Capabilities: [reward, gamification]

- En tant qu'utilisateur, je veux un système de récompenses progressives

Estimation: M
Priorité: Should
Type: Back
Dépendances: Gagner des récompenses pour mes découvertes

#### User Story: Recevoir des récompenses exclusives lors d'événements

Capabilities: [reward]

- En tant qu'utilisateur, je veux recevoir des récompenses exclusives lors d'événements

Estimation: M
Priorité: Could
Type: Back
Dépendances: Gagner des récompenses pour mes découvertes

#### User Story: Un catalogue des récompenses disponibles

Capabilities: [reward]

- En tant qu'utilisateur, je veux un catalogue des récompenses disponibles

Estimation: S
Priorité: Should
Type: Front + Back
Dépendances: Gagner des récompenses pour mes découvertes

#### User Story: Échanger des récompenses mineures contre de meilleures

Capabilities: [reward]

- En tant qu'utilisateur, je veux échanger des récompenses mineures contre de meilleures

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances: Un catalogue des récompenses disponibles

#### User Story: Partager mes récompenses sur les réseaux sociaux

Capabilities: [reward, social]

- En tant qu'utilisateur, je veux partager mes récompenses sur les réseaux sociaux

Estimation: S
Priorité: Could
Type: Front
Dépendances: Recevoir une récompense pour ma connexion quotidienne, Lier mes réseaux sociaux à mon profil

#### User Story: Voir mon progression vers la prochaine récompense

Capabilities: [reward, gamification]

- En tant qu'utilisateur, je veux voir mon progression vers la prochaine récompense

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances: Un système de récompenses progressives

#### User Story: Des défis spéciaux avec des récompenses uniques

Capabilities: [reward, gamification]

- En tant qu'utilisateur, je veux des défis spéciaux avec des récompenses uniques

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances: Gagner des récompenses pour mes découvertes

## THEME: Partenariats & Business

### Epic: Dashboard partenaires

#### User Story: Voir les statistiques de mes chasses

Capabilities: [partner, analytics, content-management]

- En tant que partenaire, je veux voir les statistiques de mes chasses

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances:

#### User Story: Analyser l'engagement des utilisateurs

Capabilities: [partner, analytics]

- En tant que partenaire, je veux analyser l'engagement des utilisateurs

Estimation: L
Priorité: Should
Type: Front + Back
Dépendances: Voir les statistiques de mes chasses

#### User Story: Suivre les conversions de mes promotions

Capabilities: [partner, analytics, campaign]

- En tant que partenaire, je veux suivre les conversions de mes promotions

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances: Voir les statistiques de mes chasses

#### User Story: Personnaliser mon espace partenaire

Capabilities: [partner]

- En tant que partenaire, je veux personnaliser mon espace partenaire

Estimation: M
Priorité: Could
Type: Front
Dépendances:

#### User Story: Générer des rapports détaillés

Capabilities: [partner, analytics]

- En tant que partenaire, je veux générer des rapports détaillés

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances: Voir les statistiques de mes chasses

#### User Story: Définir des objectifs mesurables

Capabilities: [partner, analytics]

- En tant que partenaire, je veux définir des objectifs mesurables

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances:

#### User Story: Compare mes performances avec des benchmarks

Capabilities: [partner, analytics]

- En tant que partenaire, je veux comparer mes performances avec des benchmarks

Estimation: L
Priorité: Won't
Type: Front + Back
Dépendances: Voir les statistiques de mes chasses

#### User Story: Gérer mon équipe avec différents accès

Capabilities: [partner]

- En tant que partenaire, je veux gérer mon équipe avec différents accès

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances:

#### User Story: Voir les données démographiques des participants

Capabilities: [partner, analytics]

- En tant que partenaire, je veux voir les données démographiques des participants

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances:

#### User Story: Exporter mes données statistiques

Capabilities: [partner, analytics]

- En tant que partenaire, je veux exporter mes données statistiques

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Voir les statistiques de mes chasses

### Epic: Promotion & Acquisition utilisateurs

#### User Story: Créer des codes promotionnels

Capabilities: [campaign, partner]

- En tant que partenaire, je veux créer des codes promotionnels

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances:

#### User Story: Proposer des bonus aux nouveaux utilisateurs

Capabilities: [campaign, partner, reward]

- En tant que partenaire, je veux proposer des bonus aux nouveaux utilisateurs

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances:

#### User Story: Personnaliser une page d'atterrissage

Capabilities: [campaign, partner]

- En tant que partenaire, je veux personnaliser une page d'atterrissage

Estimation: L
Priorité: Could
Type: Front
Dépendances:

#### User Story: Des outils de partage sur réseaux sociaux

Capabilities: [campaign, partner, social]

- En tant que partenaire, je veux des outils de partage sur réseaux sociaux

Estimation: M
Priorité: Should
Type: Front
Dépendances:

#### User Story: Suivre l'origine des utilisateurs acquis

Capabilities: [campaign, partner, analytics]

- En tant que partenaire, je veux suivre l'origine des utilisateurs acquis

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances: Créer des codes promotionnels

#### User Story: Des modèles d'emails promotionnels

Capabilities: [campaign, partner, notification]

- En tant que partenaire, je veux des modèles d'emails promotionnels

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Créer des codes promotionnels

#### User Story: Organiser des événements spéciaux

Capabilities: [campaign, partner]

- En tant que partenaire, je veux organiser des événements spéciaux

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances:

#### User Story: Cibler des utilisateurs par zone géographique

Capabilities: [campaign, partner]

- En tant que partenaire, je veux cibler des utilisateurs par zone géographique

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances:

#### User Story: Des QR codes personnalisés pour mes promotions

Capabilities: [campaign, partner]

- En tant que partenaire, je veux des QR codes personnalisés pour mes promotions

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Créer des codes promotionnels

#### User Story: Créer des défis exclusifs pour ma marque

Capabilities: [campaign, partner, gamification]

- En tant que partenaire, je veux créer des défis exclusifs pour ma marque

Estimation: L
Priorité: Won't
Type: Front + Back
Dépendances:

### Epic: Gestion des campagnes

#### User Story: Créer une campagne marketing liée à mes chasses

Capabilities: [campaign, partner]

- En tant que partenaire, je veux créer une campagne marketing liée à mes chasses

Estimation: L
Priorité: Should
Type: Front + Back
Dépendances:

#### User Story: Définir la durée de ma campagne

Capabilities: [campaign, partner]

- En tant que partenaire, je veux définir la durée de ma campagne

Estimation: S
Priorité: Should
Type: Front + Back
Dépendances: Créer une campagne marketing liée à mes chasses

#### User Story: Cibler des segments d'utilisateurs spécifiques

Capabilities: [campaign, partner]

- En tant que partenaire, je veux cibler des segments d'utilisateurs spécifiques

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances: Créer une campagne marketing liée à mes chasses

#### User Story: Suivre les métriques de ma campagne en temps réel

Capabilities: [campaign, partner, analytics]

- En tant que partenaire, je veux suivre les métriques de ma campagne en temps réel

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances: Créer une campagne marketing liée à mes chasses

#### User Story: Programmer des actions automatisées

Capabilities: [campaign, partner]

- En tant que partenaire, je veux programmer des actions automatisées

Estimation: L
Priorité: Could
Type: Back
Dépendances: Créer une campagne marketing liée à mes chasses

#### User Story: Personnaliser les messages de ma campagne

Capabilities: [campaign, partner, notification]

- En tant que partenaire, je veux personnaliser les messages de ma campagne

Estimation: M
Priorité: Should
Type: Front + Back
Dépendances: Créer une campagne marketing liée à mes chasses

#### User Story: Dupliquer une campagne existante

Capabilities: [campaign, partner]

- En tant que partenaire, je veux dupliquer une campagne existante

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Créer une campagne marketing liée à mes chasses

#### User Story: Compare les performances de différentes campagnes

Capabilities: [campaign, partner, analytics]

- En tant que partenaire, je veux comparer les performances de différentes campagnes

Estimation: L
Priorité: Won't
Type: Front + Back
Dépendances: Créer une campagne marketing liée à mes chasses

#### User Story: Intégrer mes campagnes à mes autres outils marketing

Capabilities: [campaign, partner]

- En tant que partenaire, je veux intégrer mes campagnes à mes autres outils marketing

Estimation: XL
Priorité: Won't
Type: Back
Dépendances: Créer une campagne marketing liée à mes chasses

#### User Story: Recevoir des alertes sur les performances

Capabilities: [campaign, partner, notification]

- En tant que partenaire, je veux recevoir des alertes sur les performances

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Créer une campagne marketing liée à mes chasses

### Epic: Programme d'affiliation

#### User Story: Devenir affilié

Capabilities: [partner, social]

- En tant qu'utilisateur, je veux devenir affilié

Estimation: M
Priorité: Won't
Type: Front + Back
Dépendances:

#### User Story: Générer des liens de parrainage

Capabilities: [partner, social]

- En tant qu'affilié, je veux générer des liens de parrainage

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Devenir affilié

#### User Story: Suivre mes commissions

Capabilities: [partner, analytics]

- En tant qu'affilié, je veux suivre mes commissions

Estimation: M
Priorité: Won't
Type: Front + Back
Dépendances: Générer des liens de parrainage

#### User Story: Voir les statistiques de mes conversions

Capabilities: [partner, analytics]

- En tant qu'affilié, je veux voir les statistiques de mes conversions

Estimation: L
Priorité: Won't
Type: Front + Back
Dépendances: Générer des liens de parrainage

#### User Story: Recevoir des paiements pour mes commissions

Capabilities: [partner, wallet]

- En tant qu'affilié, je veux recevoir des paiements pour mes commissions

Estimation: L
Priorité: Won't
Type: Back
Dépendances: Générer des liens de parrainage, Voir mon solde de monnaie virtuelle, Suivre mes commissions

#### User Story: Des outils promotionnels personnalisés

Capabilities: [partner, campaign]

- En tant qu'affilié, je veux des outils promotionnels personnalisés

Estimation: L
Priorité: Won't
Type: Front + Back
Dépendances: Devenir affilié

#### User Story: Des niveaux progressifs dans le programme

Capabilities: [partner, gamification]

- En tant qu'affilié, je veux des niveaux progressifs dans le programme

Estimation: L
Priorité: Won't
Type: Back
Dépendances: Devenir affilié

#### User Story: Être notifié des nouvelles opportunités

Capabilities: [partner, notification]

- En tant qu'affilié, je veux être notifié des nouvelles opportunités

Estimation: M
Priorité: Won't
Type: Front + Back
Dépendances: Devenir affilié

#### User Story: Entrer un code de parrainage

Capabilities: [partner, social]

- En tant qu'utilisateur, je veux entrer un code de parrainage

Estimation: S
Priorité: Could
Type: Front + Back
Dépendances: Devenir affilié

#### User Story: Un tableau de bord dédié à mon activité

Capabilities: [partner, analytics]

- En tant qu'affilié, je veux un tableau de bord dédié à mon activité

Estimation: L
Priorité: Won't
Type: Front + Back
Dépendances: Générer des liens de parrainage

### Epic: Rapports de performance

#### User Story: Des rapports hebdomadaires automatiques

Capabilities: [analytics, partner]

- En tant que partenaire, je veux des rapports hebdomadaires automatiques

Estimation: L
Priorité: Should
Type: Back
Dépendances:

#### User Story: Visualiser les données avec des graphiques

Capabilities: [analytics, partner]

- En tant que partenaire, je veux visualiser les données avec des graphiques

Estimation: L
Priorité: Should
Type: Front
Dépendances:

#### User Story: Des analyses comparatives par période

Capabilities: [analytics, partner]

- En tant que partenaire, je veux des analyses comparatives par période

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances: Visualiser les données avec des graphiques

#### User Story: Filtrer mes rapports selon différents critères

Capabilities: [analytics, partner]

- En tant que partenaire, je veux filtrer mes rapports selon différents critères

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances: Visualiser les données avec des graphiques

#### User Story: Exporter mes rapports en différents formats

Capabilities: [analytics, partner]

- En tant que partenaire, je veux exporter mes rapports en différents formats

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Visualiser les données avec des graphiques

#### User Story: Programmer l'envoi automatique de rapports

Capabilities: [analytics, partner]

- En tant que partenaire, je veux programmer l'envoi automatique de rapports

Estimation: M
Priorité: Could
Type: Back
Dépendances: Des rapports hebdomadaires automatiques

#### User Story: Des insights basés sur mes données

Capabilities: [analytics, partner]

- En tant que partenaire, je veux des insights basés sur mes données

Estimation: XL
Priorité: Won't
Type: Back
Dépendances: Visualiser les données avec des graphiques

#### User Story: Des suggestions d'optimisation basées sur mes performances

Capabilities: [analytics, partner]

- En tant que partenaire, je veux des suggestions d'optimisation basées sur mes performances

Estimation: XL
Priorité: Won't
Type: Back
Dépendances: Visualiser les données avec des graphiques

#### User Story: Personnaliser mes métriques clés

Capabilities: [analytics, partner]

- En tant que partenaire, je veux personnaliser mes métriques clés

Estimation: L
Priorité: Could
Type: Front + Back
Dépendances: Visualiser les données avec des graphiques

#### User Story: Partager mes rapports avec mon équipe

Capabilities: [analytics, partner, social]

- En tant que partenaire, je veux partager mes rapports avec mon équipe

Estimation: M
Priorité: Could
Type: Front + Back
Dépendances: Visualiser les données avec des graphiques
