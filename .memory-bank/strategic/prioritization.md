# Priorisation des User Stories et Sprints

La priorisation des User Stories (US) dans Lootopia repose sur plusieurs critères combinés pour optimiser la valeur métier, la faisabilité technique et la livraison incrémentale.

## 1. Priorité métier

Chaque US est classée selon sa priorité métier :

- **must** : Critique pour le MVP, indispensable
- **should** : Important pour le MVP, mais non bloquant
- **could** : Amélioration ou fonctionnalité non critique
- **won't** : Hors scope ou à ignorer pour l'instant

L'ordre de traitement privilégie d'abord les `must`, puis les `should`, etc.

## 2. Estimation de taille

Les US sont estimées en taille :

- **XS**, **S**, **M**, **L**, **XL**

À priorité égale, les US les plus petites sont traitées en premier pour maximiser le flux.

## 3. Dépendances

Une US ne peut être planifiée que si toutes ses dépendances sont déjà livrées. Cela garantit la cohérence technique et évite les blocages.

## 4. Capacité de l'équipe

Chaque sprint respecte la capacité de l'équipe par spécialité (front, back, blockchain). Une US est incluse seulement si elle « rentre » dans la charge disponible du sprint.

## 5. Mode MVP

Tant que le MVP n'est pas atteint, seuls les US `must` et `should` sont planifiées. Après le MVP, tout le backlog redevient éligible.

---

**Résumé du process :**

1. On trie par priorité métier (must → should → could → won't)
2. On trie par taille (XS → XL) à priorité égale
3. On respecte les dépendances
4. On respecte la capacité de l'équipe
5. On planifie d'abord le MVP, puis le reste

Pour plus de détails, voir le script `script/sprint-planning.js`.
