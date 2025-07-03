# Document technique

## Stack Technique

- Next.js pour le front web
- React Native pour le mobile
- AdonisJS pour les microservices backend
- PostgreSQL pour la base de données principale
- Redis pour le cache et la gestion des sessions
- AWS/GCP pour l'infrastructure cloud
- ARKit/ARCore pour la Réalité Augmentée
- Stripe pour la gestion de la monnaie virtuelle
- Docker pour le conteneurisation
- Github Actions pour la CI/CD
- OpenAI pour l'IA

## Argumentation des hypothèses prises pour le projet

## Base de données

Ce diagramme représente la structure complète de la base de données pour la plateforme Lootopia, une application de chasse au trésor numérique avec réalité augmentée et économie virtuelle.

```mermaid
erDiagram
    Users ||--o{ Hunts : creates
    Users ||--|| Wallets : owns
    Users ||--o{ Transactions : makes
    Users ||--o{ Notifications : receives
    Users ||--o{ UserHuntProgress : participates
    Users ||--o{ Messages : sends
    Users ||--o{ ChatParticipants : joins

    Partners ||--o{ Hunts : sponsors
    Partners ||--|| Wallets : owns

    Hunts ||--o{ Caches : contains
    Hunts ||--o{ HuntArtifacts : includes
    Hunts ||--o{ UserHuntProgress : tracked_by

    Caches ||--o{ CacheFinds : found_by
    Caches ||--o{ Artifacts : contains

    Artifacts ||--o{ HuntArtifacts : included_in
    Artifacts ||--o{ UserArtifacts : collected_by

    Chats ||--o{ Messages : contains
    Chats ||--o{ ChatParticipants : has

    Tutorials ||--o{ UserTutorialProgress : completed_by

    Users {
        uuid id PK
        string email UK
        string password_hash
        string username UK
        string first_name
        string last_name
        string avatar_url
        json profile_data
        boolean is_email_confirmed
        boolean is_active
        integer consecutive_login_days
        timestamp last_login_at
        timestamp created_at
        timestamp updated_at
        point location
        string device_token
        json notification_preferences
    }

    Wallets {
        uuid id PK
        uuid user_id FK
        uuid partner_id FK
        decimal balance
        string currency_type
        json transaction_limits
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    Transactions {
        uuid id PK
        uuid user_id FK
        uuid wallet_id FK
        uuid related_hunt_id FK
        decimal amount
        string transaction_type
        string description
        json metadata
        string status
        timestamp created_at
        timestamp updated_at
    }

    Partners {
        uuid id PK
        string name
        string description
        string logo_url
        string website_url
        json contact_info
        boolean is_verified
        timestamp created_at
        timestamp updated_at
    }

    Hunts {
        uuid id PK
        uuid creator_id FK
        uuid partner_id FK
        string name
        text description
        string image_url
        string video_url
        string audio_url
        point position
        json steps
        json indices
        integer difficulty
        json hints
        json rewards
        json tags
        boolean is_public
        boolean is_featured
        boolean is_featured_in_home
        boolean is_featured_in_category
        boolean is_featured_in_search
        boolean is_featured_in_feed
        string status
        timestamp start_date
        timestamp end_date
        timestamp created_at
        timestamp updated_at
    }

    Caches {
        uuid id PK
        uuid hunt_id FK
        string name
        text description
        point position
        json ar_data
        string image_url
        json clues
        json rewards
        boolean is_active
        integer order_in_hunt
        timestamp created_at
        timestamp updated_at
    }

    CacheFinds {
        uuid id PK
        uuid cache_id FK
        uuid user_id FK
        timestamp found_at
        json proof_data
        boolean is_verified
    }

    Artifacts {
        uuid id PK
        string name
        text description
        string image_url
        string artifact_type
        json metadata
        decimal rarity_score
        boolean is_tradeable
        timestamp created_at
        timestamp updated_at
    }

    HuntArtifacts {
        uuid hunt_id FK
        uuid artifact_id FK
        integer quantity
        decimal drop_rate
        json spawn_conditions
    }

    UserArtifacts {
        uuid id PK
        uuid user_id FK
        uuid artifact_id FK
        integer quantity
        timestamp acquired_at
        json acquisition_context
    }

    UserHuntProgress {
        uuid id PK
        uuid user_id FK
        uuid hunt_id FK
        json progress_data
        integer current_step
        integer total_steps
        decimal completion_percentage
        timestamp started_at
        timestamp completed_at
        timestamp updated_at
    }

    Notifications {
        uuid id PK
        uuid user_id FK
        string title
        text content
        string notification_type
        json data
        boolean is_read
        boolean is_push_sent
        timestamp created_at
        timestamp read_at
    }

    Chats {
        uuid id PK
        string name
        string chat_type
        json metadata
        timestamp created_at
        timestamp updated_at
    }

    ChatParticipants {
        uuid id PK
        uuid chat_id FK
        uuid user_id FK
        string role
        timestamp joined_at
        timestamp last_seen_at
    }

    Messages {
        uuid id PK
        uuid chat_id FK
        uuid sender_id FK
        text content
        string message_type
        json attachments
        boolean is_edited
        timestamp created_at
        timestamp updated_at
    }

    Tutorials {
        uuid id PK
        string title
        text description
        json steps
        string category
        integer order_index
        string difficulty_level
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    UserTutorialProgress {
        uuid id PK
        uuid user_id FK
        uuid tutorial_id FK
        integer current_step
        boolean is_completed
        timestamp started_at
        timestamp completed_at
    }
```

## Descriptions des entités principales

### Users

Table centrale des utilisateurs avec profil complet, géolocalisation et préférences de notifications.

### Hunts (Chasses)

Entité principale représentant les chasses au trésor créées par les utilisateurs ou partenaires.

### Caches

Points d'intérêt géolocalisés dans les chasses, avec données AR et récompenses.

### Wallets

Système de portefeuille virtuel pour l'économie du jeu.

### Transactions

Historique complet des mouvements de monnaie virtuelle.

### Artifacts

Objets collectibles avec système de rareté et échangeabilité.

## Index recommandés

```sql
-- Performance pour les requêtes géospatiales
CREATE INDEX idx_users_location ON Users USING GIST (location);
CREATE INDEX idx_hunts_position ON Hunts USING GIST (position);
CREATE INDEX idx_caches_position ON Caches USING GIST (position);

-- Performance pour les recherches
CREATE INDEX idx_hunts_creator_status ON Hunts (creator_id, status);
CREATE INDEX idx_hunts_featured ON Hunts (is_featured, is_public);
CREATE INDEX idx_transactions_user_date ON Transactions (user_id, created_at DESC);
CREATE INDEX idx_notifications_user_unread ON Notifications (user_id, is_read);

-- Full-text search
CREATE INDEX idx_hunts_search ON Hunts USING GIN (to_tsvector('french', name || ' ' || description));
```

## Contraintes importantes

- `Users.email` et `Users.username` doivent être uniques
- `Wallets.balance` ne peut pas être négatif
- `Hunts.start_date` doit être antérieur à `end_date`
- `UserHuntProgress.completion_percentage` entre 0 et 100
- `Artifacts.rarity_score` entre 0 et 1

## Évolutivité

Ce modèle est conçu pour supporter :

- L'ajout de nouveaux types d'artefacts et récompenses via JSON
- L'intégration AR avec métadonnées flexibles
- Le système de blockchain/NFT via les champs metadata
- La géolocalisation haute performance avec PostGIS
- Les notifications push multicanal
