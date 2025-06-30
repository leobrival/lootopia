# Business Model Lootopia

## Vue d'ensemble

Lootopia adopte un modèle économique hybride combinant les segments B2B et B2C, avec une monétisation basée sur la gamification, les services de données et l'accompagnement personnalisé.

```mermaid
graph TD
    A[Lootopia Platform] --> B[Segment B2C]
    A --> C[Segment B2B]

    B --> D[Abonnements & Freemium]
    B --> E[Microtransactions]
    B --> F[Marketplace]

    C --> G[Offre Data & Analytics]
    C --> H[Partenariats Commerciaux]
    C --> I[Accompagnement Création]

    style A fill:#6366f1,stroke:#4f46e5,color:white
    style B fill:#ec4899,stroke:#db2777,color:white
    style C fill:#f59e0b,stroke:#d97706,color:white
```

## Segment B2C - Utilisateurs Finaux

### Modèle Freemium avec Abonnements

```mermaid
graph TD
    subgraph "B2C Revenue Streams"
        Free[Utilisateur Gratuit] --> Premium[Abonnement Premium]
        Free --> Ads[Revenus Publicitaires]
        Premium --> Features[Fonctionnalités Avancées]

        Features --> Quests[Quêtes Supplémentaires]
        Features --> Rewards[Couronnes Bonus]
        Features --> Artifacts[Artefacts Premium]
        Features --> XP[XP Accéléré]

        Free --> Micro[Microtransactions]
        Premium --> Micro
        Micro --> Crowns[Achat de Couronnes]
        Micro --> Market[Marketplace]
    end

    style Free fill:#10b981,stroke:#059669,color:white
    style Premium fill:#3b82f6,stroke:#2563eb,color:white
    style Ads fill:#f59e0b,stroke:#d97706,color:white
    style Micro fill:#ec4899,stroke:#db2777,color:white
```

### Structure Tarifaire B2C

| Niveau       | Prix        | Fonctionnalités                                                                        | Revenus Publicitaires   |
| ------------ | ----------- | -------------------------------------------------------------------------------------- | ----------------------- |
| **Gratuit**  | 0€          | • Quêtes de base<br>• 50 couronnes/mois<br>• Artefacts standards                       | Oui (bannières, vidéos) |
| **Premium**  | 9,99€/mois  | • Quêtes illimitées<br>• 200 couronnes/mois<br>• Artefacts premium<br>• XP x2          | Non                     |
| **Premium+** | 19,99€/mois | • Tout Premium<br>• 500 couronnes/mois<br>• Création de quêtes<br>• Classements privés | Non                     |

### Microtransactions et Marketplace

```mermaid
graph LR
    subgraph "Économie Virtuelle"
        A[Argent Réel] -->|Conversion| B[Couronnes]
        B --> C[Achats In-App]
        C --> D[Artefacts]
        C --> E[Boosts XP]
        C --> F[Customisation]

        D --> G[Marketplace]
        G -->|Revente| H[Autres Joueurs]
        G -->|Frais Transaction| I[Revenus Platform]
    end

    style A fill:#22c55e,stroke:#16a34a,color:white
    style B fill:#f59e0b,stroke:#d97706,color:white
    style I fill:#ef4444,stroke:#dc2626,color:white
```

**Taux de conversion :**

- 1€ = 100 couronnes
- Frais de transaction marketplace : 5%
- Commission sur revente d'artefacts : 10%

---

## 🏢 Segment B2B - Entreprises et Partenaires

### Offre Data & Analytics

```mermaid
graph TD
    subgraph "B2B Data Services"
        A[Données Collectées] --> B[Analytics Dashboard]
        A --> C[Rapports Personnalisés]
        A --> D[API Data Access]

        B --> E[Insights Comportementaux]
        B --> F[Métriques d'Engagement]
        B --> G[Géolocalisation Trends]

        C --> H[Rapports Hebdomadaires]
        C --> I[Analyses Saisonnières]
        C --> J[ROI Campaigns]
    end

    style A fill:#8b5cf6,stroke:#7c3aed,color:white
    style B fill:#06b6d4,stroke:#0891b2,color:white
    style E fill:#10b981,stroke:#059669,color:white
```

**Services Data B2B :**

| Service             | Description                                    | Tarification  |
| ------------------- | ---------------------------------------------- | ------------- |
| **Analytics Basic** | Dashboard temps réel, métriques d'engagement   | 299€/mois     |
| **Analytics Pro**   | + Rapports personnalisés, segmentation avancée | 599€/mois     |
| **Data API**        | Accès API aux données anonymisées              | 0,10€/requête |
| **Custom Reports**  | Rapports sur mesure, consultation expert       | 150€/rapport  |

### Partenariats Commerciaux

```mermaid
graph TD
    subgraph "Partnership Models"
        A[Commerces Locaux] --> B[Commission sur Achats]
        A --> C[Forfait Hotspot Énergie]

        D[Marques] --> E[Placement Produit]
        D --> F[Quêtes Sponsorisées]

        G[Événements] --> H[Animations Personnalisées]
        G --> I[Team Building]

        B -->|5-10%| J[Revenue Share]
        C -->|50€/mois| K[Fixed Fee]
        E -->|1000€/campagne| L[Sponsorship]
        F -->|500€/quête| M[Content Creation]
    end

    style A fill:#f97316,stroke:#ea580c,color:white
    style D fill:#ec4899,stroke:#db2777,color:white
    style G fill:#8b5cf6,stroke:#7c3aed,color:white
```

### Accompagnement à la Création de Quêtes

```mermaid
graph LR
    subgraph "Service Tiers"
        A[Consultation] --> B[Conception]
        B --> C[Développement]
        C --> D[Déploiement]
        D --> E[Suivi Performance]

        F[Forfait Découverte] --> G[5 Quêtes Incluses]
        H[Forfait Pro] --> I[Création Illimitée]
        H --> J[Support Dédié]
    end

    style F fill:#22c55e,stroke:#16a34a,color:white
    style H fill:#3b82f6,stroke:#2563eb,color:white
```

**Tarification Services B2B :**

| Package        | Prix       | Inclus                           | Cible                |
| -------------- | ---------- | -------------------------------- | -------------------- |
| **Starter**    | 1 500€     | 5 quêtes, formation 2h           | PME, associations    |
| **Business**   | 5 000€     | 20 quêtes, support 6 mois        | Moyennes entreprises |
| **Enterprise** | 15 000€    | Quêtes illimitées, support dédié | Grandes entreprises  |
| **À la quête** | 300€/quête | Création ponctuelle              | Projets ponctuels    |

---

## 🔄 Synergies B2B/B2C

```mermaid
graph TD
    subgraph "Cross-Segment Value Creation"
        A[Données B2C] --> B[Insights B2B]
        C[Partenaires B2B] --> D[Contenu B2C]
        E[Revenus B2B] --> F[Développement Platform]
        F --> G[Expérience B2C Améliorée]
        G --> H[Plus d'Utilisateurs]
        H --> I[Plus de Données]
        I --> B
    end

    style A fill:#ec4899,stroke:#db2777,color:white
    style B fill:#f59e0b,stroke:#d97706,color:white
    style F fill:#6366f1,stroke:#4f46e5,color:white
```

**Points d'intersection clés :**

- **Data Loop** : Les données B2C alimentent les services B2B
- **Content Loop** : Les partenaires B2B créent du contenu pour les utilisateurs B2C
- **Revenue Loop** : Les revenus B2B financent l'amélioration de l'expérience B2C

---

## 📊 Projections et Métriques Clés

### KPIs B2C

- **ARPU** (Average Revenue Per User) : 8-12€/mois
- **Taux de conversion Freemium → Premium** : 5-8%
- **Rétention à 30 jours** : 40%
- **Lifetime Value (LTV)** : 150€

### KPIs B2B

- **Contract Value Moyen** : 3 500€
- **Taux de renouvellement** : 85%
- **Acquisition Cost** : 500€
- **Temps de payback** : 6 mois

### Hypothèses à Valider

```mermaid
graph TD
    subgraph "Hypothèses Critiques"
        A[Taux adoption Premium 5%] --> A1[Test A/B pricing]
        B[Commission magasins 7%] --> B1[Pilotes partenaires]
        C[Rétention 40% à 30j] --> C1[Cohorts analysis]
        D[ARPU 10€/mois] --> D1[Revenue tracking]
    end

    style A fill:#ef4444,stroke:#dc2626,color:white
    style B fill:#ef4444,stroke:#dc2626,color:white
    style C fill:#ef4444,stroke:#dc2626,color:white
    style D fill:#ef4444,stroke:#dc2626,color:white
```

**Prochaines étapes de validation :**

1. **MVP Test** : Valider la conversion Freemium avec 1000 utilisateurs
2. **Pilot B2B** : 5 partenaires commerciaux pour tester le modèle commission
3. **Retention Study** : Analyser les comportements d'engagement sur 3 mois
4. **Pricing Optimization** : Tests A/B sur les tiers d'abonnement
