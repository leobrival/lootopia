const {
  estimationDays,
  SPRINT_HOURS,
  team,
  readBacklogCsv,
  extractUserStories,
} = require("./backlog-shared");
const fs = require("fs");

const records = readBacklogCsv();

// 1. On prépare les US avec toutes les infos utiles
const usList = extractUserStories(records);

// 2. On trie d'abord par estimation au sein de chaque Epic, puis par priorité globale
const prioOrder = { must: 1, should: 2, could: 3, "won't": 4 };
const sizeOrder = { XS: 1, S: 2, M: 3, L: 4, XL: 5 };

// On regroupe par Epic
const epicGroups = {};
for (const us of usList) {
  if (!epicGroups[us.epic]) epicGroups[us.epic] = [];
  epicGroups[us.epic].push(us);
}

// On trie chaque Epic par estimation croissante
for (const epic in epicGroups) {
  epicGroups[epic].sort(
    (a, b) => sizeOrder[a.estimation] - sizeOrder[b.estimation]
  );
}

// On aplatit tout en gardant l'ordre des Epics d'origine
let usListOrdered = [];
for (const epic of Object.keys(epicGroups)) {
  usListOrdered = usListOrdered.concat(epicGroups[epic]);
}

// --- PATCH: score de dépendance pour chaque US ---
function computeDependencyScore(usList) {
  // Map titre -> US
  const titreToUs = Object.fromEntries(usList.map((u) => [u.titre, u]));
  // Pour chaque US, compte combien d'US dépendent d'elle (direct ou indirect)
  function countDependants(titre, visited = new Set()) {
    if (visited.has(titre)) return 0;
    visited.add(titre);
    let count = 0;
    for (const u of usList) {
      if (u.dependances.includes(titre)) {
        count += 1 + countDependants(u.titre, visited);
      }
    }
    return count;
  }
  for (const us of usList) {
    us.dependencyScore = countDependants(us.titre);
  }
}
computeDependencyScore(usList);
// Trie par score décroissant, puis priorité, puis estimation
usList.sort((a, b) => {
  if (prioOrder[a.priorite] !== prioOrder[b.priorite])
    return prioOrder[a.priorite] - prioOrder[b.priorite];
  if (sizeOrder[a.estimation] !== sizeOrder[b.estimation])
    return sizeOrder[a.estimation] - sizeOrder[b.estimation];
  return b.dependencyScore - a.dependencyScore;
});

// 3. Sprint planning avec gestion des dépendances
let sprints = [];
let done = new Set();
let backlog = [...usList];

const SPRINT_DAYS = 5;
const HOURS_PER_DEV_PER_DAY = 8;
const teamCapacity = {};
for (const role of Object.keys(team)) {
  teamCapacity[role] = team[role] * SPRINT_DAYS * HOURS_PER_DEV_PER_DAY;
}
console.log(`Capacité d'un sprint par spécialisation :`, teamCapacity);
console.log(`Composition équipe :`, team);

function getUsLoadByRole(us) {
  // Répartition équitable si multi-spécialité
  const type = (us.type || "").toLowerCase();
  let roles = [];
  if (type.includes("front")) roles.push("front");
  if (type.includes("back")) roles.push("back");
  if (type.includes("blockchain")) roles.push("blockchain");
  if (roles.length === 0) return {}; // pas de charge
  const share = us.estimationHours / roles.length;
  const load = {};
  for (const r of roles) load[r] = share;
  return load;
}

for (let sprintNum = 1; sprintNum <= 12; sprintNum++) {
  let sprint = [];
  let sprintLoad = { front: 0, back: 0, blockchain: 0 };
  let backlogLeft = [...backlog];
  let added = true;
  while (added) {
    added = false;
    // Pour chaque spécialité, on essaie de remplir la capacité
    for (const role of Object.keys(teamCapacity)) {
      // US dispo pour ce rôle, dépendances OK, pas déjà dans le sprint
      let available = backlogLeft.filter(
        (us) =>
          !sprint.includes(us) &&
          getUsLoadByRole(us)[role] &&
          us.dependances.every((dep) => done.has(dep))
      );
      for (let i = 0; i < available.length; i++) {
        const us = available[i];
        const usLoad = getUsLoadByRole(us);
        // Vérifie la capacité pour ce rôle
        if ((sprintLoad[role] || 0) + (usLoad[role] || 0) > teamCapacity[role])
          continue;
        // Vérifie la capacité pour les autres rôles impliqués dans l'US
        let fits = true;
        for (const r of Object.keys(usLoad)) {
          if ((sprintLoad[r] || 0) + (usLoad[r] || 0) > teamCapacity[r]) {
            fits = false;
            break;
          }
        }
        if (!fits) continue;
        sprint.push(us);
        for (const r of Object.keys(usLoad)) {
          sprintLoad[r] = (sprintLoad[r] || 0) + usLoad[r];
        }
        done.add(us.titre);
        backlogLeft = backlogLeft.filter((u) => u.idx !== us.idx);
        added = true;
        break; // On repart sur la boucle pour ce rôle
      }
    }
  }
  // On retire du backlog global les US du sprint
  backlog = backlog.filter((u) => !sprint.includes(u));

  // --- PATCH: tri topologique pour l'ordre des dépendances dans le sprint ---
  function topoSort(usArray) {
    const titreToUs = Object.fromEntries(usArray.map((u) => [u.titre, u]));
    const visited = new Set();
    const result = [];
    function visit(u) {
      if (visited.has(u.titre)) return;
      for (const dep of u.dependances) {
        if (titreToUs[dep]) visit(titreToUs[dep]);
      }
      visited.add(u.titre);
      result.push(u);
    }
    for (const u of usArray) visit(u);
    return result;
  }
  sprint = topoSort(sprint);
  // --- END PATCH ---

  sprints.push({ us: sprint, load: sprintLoad });
  if (backlog.length === 0) break;
}

// 4. Affichage
console.log("\n--- Sprint Planning (12 premiers sprints) ---");
sprints.slice(0, 12).forEach((sprint, i) => {
  const sprintHours = Object.values(sprint.load).reduce((a, b) => a + b, 0);
  console.log(`\nSprint ${i + 1} (${sprintHours.toFixed(1)}h):`);
  console.log(
    `  Charge: Front ${sprint.load.front?.toFixed(1) || 0}h | Back ${
      sprint.load.back?.toFixed(1) || 0
    }h | Blockchain ${sprint.load.blockchain?.toFixed(1) || 0}h`
  );
  sprint.us.forEach((us) => {
    console.log(
      `[${us.dependencyScore}] [${us.priorite.toUpperCase()}][${
        us.estimation
      }] ${us.titre} (${us.epic})`
    );
    if (us.dependances.length)
      console.log(`    Dépendances: ${us.dependances.join(", ")}`);
  });
});

// 5. Export CSV
const csvRows = [
  [
    "Sprint",
    "Spécialisation",
    "Charge (h)",
    "Titre",
    "Epic",
    "Estimation",
    "Priorité",
    "Dépendances",
  ].join(","),
];
sprints.slice(0, 12).forEach((sprint, i) => {
  sprint.us.forEach((us) => {
    const usLoad = getUsLoadByRole(us);
    for (const role of Object.keys(usLoad)) {
      csvRows.push(
        [
          i + 1,
          role,
          usLoad[role].toFixed(1),
          `"${us.titre.replace(/"/g, '""')}"`,
          `"${us.epic.replace(/"/g, '""')}"`,
          us.estimation,
          us.priorite,
          `"${(us.dependances || []).join("; ")}"`,
        ].join(",")
      );
    }
  });
});

fs.writeFileSync("sprint-planning.csv", csvRows.join("\n"), "utf8");
console.log("\nExport CSV : sprint-planning.csv");
