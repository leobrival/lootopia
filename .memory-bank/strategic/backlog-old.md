# Backlog

## Expérience joueur

### US-EJ-01: Inscription d'un nouveau joueur

#### Titre: Inscription sur la plateforme

#### User Story:

En tant que nouveau visiteur, je souhaite m'inscrire sur la plateforme, afin de participer aux chasses au trésor.

#### Règles fonctionnelles:

- [ ] L'inscription nécessite un email valide
- [ ] Le mot de passe doit contenir au moins 8 caractères dont une majuscule et un chiffre
- [ ] Le pseudo doit être unique et avoir entre 3 et 15 caractères
- [ ] Une confirmation par email est requise

#### Implémentation technique:

- [ ] Créer un formulaire d'inscription avec validation côté client et serveur
- [ ] Stocker les informations utilisateur dans la base de données
- [ ] Mettre en place un service d'envoi d'emails de confirmation
- [ ] Implémenter un mécanisme de vérification de l'unicité du pseudo

#### Critères d'acceptation:

- [ ] Étant donné un visiteur sur la page d'accueil, lorsqu'il remplit correctement le formulaire d'inscription et le soumet, alors un compte est créé et un email de confirmation est envoyé.

### US-EJ-02: Connexion à son compte

#### Titre: Connexion à la plateforme

#### User Story:

En tant qu'utilisateur inscrit, je souhaite me connecter à mon compte, afin d'accéder à mes chasses au trésor.

#### Règles fonctionnelles:

- [ ] La connexion se fait avec l'email et le mot de passe
- [ ] Possibilité de cocher "Se souvenir de moi"
- [ ] Accès à une fonctionnalité "Mot de passe oublié"
- [ ] Blocage temporaire après 3 tentatives échouées

#### Implémentation technique:

- [ ] Créer un formulaire de connexion
- [ ] Implémenter l'authentification avec JWT
- [ ] Stocker le token dans un cookie sécurisé ou localStorage selon l'option "Se souvenir de moi"
- [ ] Mettre en place un système de verrouillage de compte après échecs multiples

#### Critères d'acceptation:

- [ ] Étant donné un utilisateur inscrit, lorsqu'il saisit correctement ses identifiants, alors il est redirigé vers son tableau de bord.

### US-EJ-03: Tutoriel de bienvenue

#### Titre: Tutoriel interactif pour nouveaux joueurs

#### User Story:

En tant que nouvel utilisateur, je souhaite suivre un tutoriel interactif, afin de comprendre comment jouer aux chasses au trésor.

#### Règles fonctionnelles:

Le tutoriel se lance automatiquement à la première connexion
L'utilisateur peut passer certaines étapes ou tout le tutoriel
Le tutoriel guide l'utilisateur à travers les fonctionnalités de base
Une mini-chasse didactique est proposée

#### Implémentation technique:

Créer une série de modales interactives
Développer une mini-chasse simplifiée spécifique au tutoriel
Stocker la progression du tutoriel dans la base de données
Permettre de relancer le tutoriel depuis les paramètres

#### Critères d'acceptation:

Étant donné un nouvel utilisateur qui se connecte pour la première fois, lorsqu'il arrive sur la plateforme, alors le tutoriel se lance automatiquement.

### US-EJ-04: Progression de niveau joueur

#### Titre: Système de progression de niveau

#### User Story:

En tant que joueur, je souhaite gagner de l'expérience et monter en niveau, afin de débloquer de nouvelles fonctionnalités et récompenses.

#### Règles fonctionnelles:

Gain d'XP à la complétion d'énigmes et de chasses
Affichage du niveau actuel et de la progression vers le niveau suivant
Déblocage de fonctionnalités spéciales à certains paliers
Notification lors du passage de niveau

#### Implémentation technique:

Créer un système de calcul d'XP et de niveaux avec formule progressive
Implémenter les déclencheurs d'XP dans les actions concernées
Développer une barre de progression visuelle
Mettre en place un système de notification de niveau

#### Critères d'acceptation:

Étant donné un joueur qui termine une chasse au trésor, lorsque l'XP gagnée suffit pour passer au niveau suivant, alors une notification apparaît et les nouvelles fonctionnalités sont débloquées.

### US-EJ-05: Tableau de bord personnel

#### Titre: Dashboard de joueur

#### User Story:

En tant que joueur, je souhaite visualiser mes statistiques et ma progression sur un tableau de bord personnel, afin de suivre mon évolution dans le jeu.

#### Règles fonctionnelles:

Affichage du niveau et de l'XP actuelle
Historique des chasses terminées et en cours
Statistiques de réussite par type d'énigme
Affichage des réalisations et badges obtenus

#### Implémentation technique:

Développer un dashboard avec sections modulaires
Créer des graphiques et visualisations de données
Mettre en place des requêtes agrégées pour les statistiques
Implémenter un système de cache pour optimiser les performances

#### Critères d'acceptation:

Étant donné un joueur connecté, lorsqu'il accède à son tableau de bord, alors il visualise ses statistiques à jour et sa progression actuelle.

## Création & Gestion de contenu

### US-CG-01: Création d'une chasse standard

#### Titre: Créer une chasse au trésor standard

#### User Story:

En tant que créateur de contenu, je souhaite créer une chasse au trésor standard, afin de proposer une nouvelle aventure aux joueurs.
Règles fonctionnelles:
Possibilité de définir un titre et une description
Ajout d'énigmes depuis une bibliothèque existante
Définition d'un parcours linéaire ou avec embranchements
Configuration des récompenses associées

#### Implémentation technique:

Développer un formulaire de création multi-étapes
Mettre en place une interface drag & drop pour l'organisation des énigmes
Implémenter un système de prévisualisation
Créer un module de configuration des récompenses
Critères d'acceptation:
Étant donné un créateur connecté, lorsqu'il complète le processus de création avec toutes les informations nécessaires, alors une nouvelle chasse est publiée et disponible pour les joueurs.
US-CG-02: Édition d'énigmes personnalisées
Titre: Créer des énigmes personnalisées
User Story:
En tant que créateur de contenu, je souhaite créer mes propres énigmes personnalisées, afin d'enrichir mes chasses au trésor avec du contenu unique.
Règles fonctionnelles:
Choix entre différents types d'énigmes (QCM, texte, image, géolocalisation)
Définition des indices et solutions
Réglage de la difficulté et des points d'XP
Option pour ajouter des médias (images, sons, vidéos)

#### Implémentation technique:

Développer un éditeur d'énigmes avec différents templates
Mettre en place un système de stockage de médias
Implémenter un validateur de solutions
Créer un système d'étiquetage par difficulté et type

#### Critères d'acceptation:

Étant donné un créateur dans l'interface d'édition, lorsqu'il crée une énigme avec tous les champs requis et la sauvegarde, alors l'énigme est ajoutée à sa bibliothèque personnelle.
US-CG-03: Bibliothèque d'énigmes
Titre: Gestion de la bibliothèque d'énigmes
User Story:
En tant que créateur de contenu, je souhaite gérer ma bibliothèque d'énigmes, afin de réutiliser et organiser mes créations.
Règles fonctionnelles:
Recherche et filtrage par type, difficulté et tags
Organisation par collections ou catégories
Possibilité de dupliquer et modifier des énigmes existantes
Statistiques d'utilisation et de taux de réussite
Implémentation technique:
Développer une interface de bibliothèque avec filtres avancés
Implémenter un système de tags et collections
Créer des fonctionnalités de duplication et d'édition batch
Mettre en place un tracking des statistiques d'utilisation
Critères d'acceptation:
Étant donné un créateur dans sa bibliothèque d'énigmes, lorsqu'il filtre par type et difficulté, alors seules les énigmes correspondant aux critères sont affichées.
US-CG-04: Prévisualisation de chasse
Titre: Prévisualiser une chasse avant publication
User Story:
En tant que créateur de contenu, je souhaite prévisualiser ma chasse au trésor avant publication, afin de vérifier l'expérience utilisateur et corriger d'éventuels problèmes.
Règles fonctionnelles:
Navigation à travers toutes les étapes de la chasse
Possibilité de tester les mécanismes de validation
Évaluation de la difficulté et de la durée estimée
Commentaires et annotations pour modifications futures
Implémentation technique:
Développer un mode prévisualisation spécifique
Implémenter une boucle de jeu temporaire pour test
Créer un système d'annotations et de calcul de métriques
Permettre des modifications directes depuis la prévisualisation
Critères d'acceptation:
Étant donné un créateur avec une chasse non publiée, lorsqu'il active le mode prévisualisation, alors il peut parcourir l'intégralité de la chasse comme le ferait un joueur.
US-CG-05: Publication et partage de chasse
Titre: Publier et partager une chasse au trésor
User Story:
En tant que créateur de contenu, je souhaite publier et partager ma chasse au trésor, afin d'attirer des joueurs et recevoir des retours.
Règles fonctionnelles:
Options de publication: publique, privée, ou avec code d'accès
Génération de liens et QR codes pour partage facile
Configuration des dates de début et de fin optionnelles
Possibilité de promouvoir la chasse en la mettant en avant
Implémentation technique:
Développer un processus de publication avec validation
Créer un générateur de liens courts et QR codes
Implémenter un système de programmation et d'accès restreint
Mettre en place un mécanisme de mise en avant payant ou par mérite
Critères d'acceptation:
Étant donné un créateur avec une chasse complète, lorsqu'il la publie et génère un lien de partage, alors les joueurs ayant ce lien peuvent accéder à la chasse selon les paramètres définis.
Thème: Écosystème & économique
US-EE-01: Création d'un wallet
Titre: Initialiser son wallet numérique
User Story:
En tant que joueur, je souhaite initialiser mon wallet numérique, afin de recevoir et gérer mes récompenses.
Règles fonctionnelles:
Création automatique lors de l'inscription ou option d'activation manuelle
Choix entre wallet custodial (géré par la plateforme) ou non-custodial
Tutoriel explicatif sur le fonctionnement et la sécurité
Affichage du solde et de l'historique des transactions
Implémentation technique:
Intégrer une solution de wallet blockchain (ex: MetaMask, WalletConnect)
Développer une option de wallet custodial interne
Mettre en place les contrats intelligents pour la gestion des jetons
Créer une interface de visualisation des actifs et transactions
Critères d'acceptation:
Étant donné un joueur sans wallet, lorsqu'il initialise son wallet, alors celui-ci est créé et apparaît dans son profil avec un solde à zéro.
US-EE-02: Réception de récompenses
Titre: Recevoir des récompenses en tokens
User Story:
En tant que joueur, je souhaite recevoir des tokens en récompense de mes activités, afin d'accumuler des actifs numériques.
Règles fonctionnelles:
Attribution automatique à la complétion de chasses ou d'achievements
Notification de réception avec montant et raison
Options pour staker ou utiliser les tokens immédiatement
Programme de fidélité avec bonus récurrents
Implémentation technique:
Développer un système d'attribution basé sur des triggers d'actions
Implémenter des smart contracts pour les transferts de tokens
Créer un système de notifications
Mettre en place une logique de staking et d'intérêts
Critères d'acceptation:
Étant donné un joueur qui complète une chasse au trésor, lorsque la validation finale est effectuée, alors les tokens de récompense sont transférés à son wallet avec une notification.
US-EE-03: Minting de NFT
Titre: Créer un NFT de réussite
User Story:
En tant que joueur, je souhaite recevoir et créer des NFTs pour mes accomplissements, afin de posséder des preuves numériques de mes réussites.
Règles fonctionnelles:
Attribution de NFTs pour les chasses complétées et achievements spéciaux
Possibilité de personnaliser certains aspects du NFT
Affichage des NFTs dans une galerie personnelle
Option pour partager les NFTs sur les réseaux sociaux
Implémentation technique:
Développer une interface de minting simplifiée
Intégrer un smart contract ERC-721 ou ERC-1155 pour les NFTs
Créer un système de stockage décentralisé pour les métadonnées (IPFS)
Mettre en place une galerie visuelle avec options de partage
Critères d'acceptation:
Étant donné un joueur qui termine une chasse spéciale, lorsque la validation finale est effectuée, alors un NFT unique est créé et ajouté à sa collection avec une animation de célébration.
US-EE-04: Achat avec des tokens
Titre: Acheter des items avec ses tokens
User Story:
En tant que joueur, je souhaite dépenser mes tokens pour acheter des items ou avantages, afin d'améliorer mon expérience de jeu.
Règles fonctionnelles:
Catalogue d'items disponibles avec prix en tokens
Catégories: indices premium, personnalisation, boost XP, accès anticipé
Confirmation avant achat avec détail de la transaction
Historique des achats dans le profil
Implémentation technique:
Développer une boutique intégrée avec catalogue dynamique
Implémenter un processus de transaction sécurisé
Créer un système d'inventaire pour les items achetés
Mettre en place un historique de transactions
Critères d'acceptation:
Étant donné un joueur avec suffisamment de tokens, lorsqu'il sélectionne un item dans la boutique et confirme l'achat, alors l'item est ajouté à son inventaire et les tokens sont déduits de son wallet.
US-EE-05: Échange de cartes cadeaux
Titre: Échanger ses tokens contre des cartes cadeaux
User Story:
En tant que joueur, je souhaite échanger mes tokens contre des cartes cadeaux de partenaires, afin d'obtenir des récompenses dans le monde réel.
Règles fonctionnelles:
Catalogue de cartes cadeaux de différentes enseignes
Conversion claire du taux tokens/valeur monétaire
Vérification d'identité pour les échanges de grande valeur
Réception par email avec code d'activation
Implémentation technique:
Intégrer des APIs de fournisseurs de cartes cadeaux
Développer un système de conversion et de vérification
Implémenter un processus KYC pour les transactions importantes
Créer un système d'envoi sécurisé par email
Critères d'acceptation:
Étant donné un joueur avec suffisamment de tokens, lorsqu'il choisit une carte cadeau et confirme l'échange, alors il reçoit un email contenant le code de la carte cadeau et les tokens sont déduits de son wallet.
Thème: Partenariats & Business
US-PB-01: Inscription partenaire
Titre: Inscription en tant que partenaire
User Story:
En tant qu'entreprise, je souhaite m'inscrire comme partenaire sur la plateforme, afin de créer des chasses au trésor promotionnelles.
Règles fonctionnelles:
Formulaire d'inscription spécifique aux entreprises
Vérification et validation manuelle par l'équipe
Choix entre différents niveaux de partenariat
Documentation et ressources accessibles après validation
Implémentation technique:
Développer un parcours d'inscription business distinct
Créer un système de validation en back-office
Implémenter différents tiers de partenariat avec droits associés
Mettre en place une base documentaire accessible
Critères d'acceptation:
Étant donné une entreprise qui complète le formulaire d'inscription partenaire, lorsque l'équipe valide la demande, alors un compte partenaire est créé avec les droits correspondant au niveau choisi.
US-PB-02: Création de chasse promotionnelle
Titre: Créer une chasse au trésor promotionnelle
User Story:
En tant que partenaire, je souhaite créer une chasse au trésor liée à ma marque, afin de promouvoir mes produits ou services.
Règles fonctionnelles:
Outils de personnalisation avancés aux couleurs de la marque
Intégration d'éléments promotionnels (logos, produits)
Configuration de récompenses spécifiques ou coupons
Options de ciblage et de restrictions d'accès
Implémentation technique:
Développer un éditeur de chasse avec options de branding
Créer un système d'intégration de médias promotionnels
Implémenter un générateur de coupons et codes promo
Mettre en place des contrôles d'accès et ciblage géographique
Critères d'acceptation:
Étant donné un partenaire connecté, lorsqu'il crée une chasse promotionnelle avec branding et configure les récompenses, alors la chasse est publiée avec les éléments de marque visibles.
US-PB-03: Dashboard analytique partenaire
Titre: Consulter les analytics de campagne
User Story:
En tant que partenaire, je souhaite accéder à un tableau de bord analytique, afin de mesurer la performance de mes chasses promotionnelles.
Règles fonctionnelles:
Métriques clés: participants, taux de complétion, engagement
Graphiques d'évolution dans le temps
Données démographiques des participants
Export des rapports en PDF ou CSV
Implémentation technique:
Développer un dashboard avec visualisations interactives
Implémenter un système d'analytics en temps réel
Créer un module de segmentation démographique
Mettre en place des fonctionnalités d'export de données
Critères d'acceptation:
Étant donné un partenaire avec une campagne active, lorsqu'il accède à son tableau de bord, alors il visualise les métriques à jour de sa campagne avec options d'analyse détaillée.
US-PB-04: Gestion de campagne marketing
Titre: Gérer une campagne marketing multi-canaux
User Story:
En tant que partenaire, je souhaite configurer et gérer une campagne marketing multi-canaux pour ma chasse au trésor, afin d'attirer un maximum de participants.
Règles fonctionnelles:
Configuration de messages promotionnels pour différents canaux
Programmation des publications sur réseaux sociaux
Génération de codes QR et affichages physiques
Suivi des sources de trafic et conversion
Implémentation technique:
Intégrer des APIs de réseaux sociaux pour publications
Développer un outil de génération de matériel marketing
Créer un système de tracking avec UTM parameters
Mettre en place des analytics de conversion par canal
Critères d'acceptation:
Étant donné un partenaire avec une chasse publiée, lorsqu'il configure sa campagne marketing et l'active, alors les publications sont programmées et les outils de suivi sont mis en place.
US-PB-05: Programme d'affiliation
Titre: Rejoindre le programme d'affiliation
User Story:
En tant que créateur de contenu externe, je souhaite rejoindre le programme d'affiliation, afin de promouvoir la plateforme et générer des revenus.
Règles fonctionnelles:
Processus d'inscription au programme avec validation
Accès à des liens d'affiliation personnalisés
Tableau de bord de suivi des conversions et revenus
Paramètres de paiement et seuils de versement
Implémentation technique:
Développer un système d'attribution et tracking d'affiliés
Créer un générateur de liens avec paramètres de suivi
Implémenter un dashboard spécifique aux affiliés
Mettre en place un système de paiement automatisé
Critères d'acceptation:
Étant donné un créateur de contenu approuvé comme affilié, lorsqu'il génère un lien et qu'un utilisateur s'inscrit via ce lien, alors la conversion est attribuée à l'affilié et visible dans son tableau de bord.
