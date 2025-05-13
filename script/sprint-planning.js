const {
  estimationDays,
  SPRINT_HOURS,
  team,
  readBacklogCsv,
  extractUserStories,
  parseBacklogMd,
  computeDependencyScore,
  getDependencyChainLength,
  exportCsv,
} = require("./backlog-shared");
const fs = require("fs");
const path = require("path");

const records = readBacklogCsv();

// 1. On prépare les US avec toutes les infos utiles
const usList = parseBacklogMd();

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

// --- Map titre -> US (à placer AVANT usWithDependants) ---
const titreToUs = Object.fromEntries(usList.map((u) => [u.titre, u]));

// --- Calcul usWithDependants (utilisé plus bas) ---
const usWithDependants = usList.map((us) => ({
  titre: us.titre,
  priorite: us.priorite,
  estimation: us.estimation,
  nbDependants: us.dependencyScore,
  chainLen: getDependencyChainLength(us, titreToUs),
}));

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

let mvpMode = true;
for (let sprintNum = 1; sprintNum <= 50; sprintNum++) {
  let sprint = [];
  let sprintLoad = { front: 0, back: 0, blockchain: 0 };
  let backlogLeft = [...backlog];
  let added = true;
  while (added) {
    added = false;
    for (const role of Object.keys(teamCapacity)) {
      // --- MVP ONLY ---
      let available = backlogLeft.filter(
        (us) =>
          !sprint.includes(us) &&
          getUsLoadByRole(us)[role] &&
          us.dependances.every((dep) => done.has(dep)) &&
          (!mvpMode ||
            ["must", "should"].includes(
              (us.priorite || "").toLowerCase().trim()
            ))
      );
      // --- END MVP ONLY ---
      for (let i = 0; i < available.length; i++) {
        const us = available[i];
        const usLoad = getUsLoadByRole(us);
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
        break;
      }
    }
  }
  backlog = backlog.filter((u) => !sprint.includes(u));
  sprints.push({ us: sprint, load: sprintLoad });
  // --- switch to full backlog when MVP is done ---
  if (
    mvpMode &&
    backlog.filter((us) =>
      ["must", "should"].includes((us.priorite || "").toLowerCase().trim())
    ).length === 0
  ) {
    mvpMode = false;
  }
  if (backlog.length === 0) break;
}

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
    "Nb dépendances",
    "Nb dépendants",
  ].join(","),
];
// Build a map titre -> dépendants count pour le backlog courant
const titreToDependants = {};
usList.forEach((us) => {
  titreToDependants[us.titre] = 0;
});
usList.forEach((us) => {
  (us.dependances || []).forEach((dep) => {
    if (dep && titreToDependants[dep] !== undefined) {
      titreToDependants[dep]++;
    }
  });
});
sprints.slice(0, 12).forEach((sprint, i) => {
  sprint.us.forEach((us) => {
    const usLoad = getUsLoadByRole(us);
    const nbDep = (us.dependances || []).length;
    const nbDependants = titreToDependants[us.titre] || 0;
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
          nbDep,
          nbDependants,
        ].join(",")
      );
    }
  });
});

fs.writeFileSync("sprint-planning.csv", csvRows.join("\n"), "utf8");

// --- MVP completion sprint ---
function normalize(str) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}
const mustShould = usList.filter(
  (us) =>
    (us.priorite || "").toLowerCase().trim() === "must" ||
    (us.priorite || "").toLowerCase().trim() === "should"
);
const mustShouldTitles = new Set(mustShould.map((u) => normalize(u.titre)));
let doneUS = new Set();
let mvpSprint = 0;
for (let i = 0; i < sprints.length; i++) {
  for (const us of sprints[i].us) {
    if (mustShouldTitles.has(normalize(us.titre))) {
      doneUS.add(normalize(us.titre));
    }
  }
  if (doneUS.size === mustShouldTitles.size) {
    mvpSprint = i + 1;
    break;
  }
}
if (doneUS.size === mustShouldTitles.size) {
  console.log(`[STATS] MVP prêt à la fin du sprint ${mvpSprint}`);
} else {
  console.log(
    `[STATS] MVP NON ATTEINT (${doneUS.size}/${mustShouldTitles.size})`
  );
}

// --- Focus sur les US avec chaîne de dépendances > 1 ---
const usLongChains = usWithDependants.filter((us) => us.chainLen > 1);
usLongChains.sort((a, b) => b.chainLen - a.chainLen);
console.log(
  "\n--- TOP 5 US avec la plus longue chaîne de dépendances (>1) ---"
);
usLongChains.slice(0, 5).forEach((us, idx) => {
  console.log(
    `${idx + 1}. [${us.priorite.toUpperCase()}][${us.estimation}] ${
      us.titre
    } : chaîne = ${us.chainLen}, dépendants = ${us.nbDependants}`
  );
});

// --- Console résumé minifié ---
console.log(`[STATS] Top 3 critiques:`);
usWithDependants.slice(0, 3).forEach((us, i) => {
  console.log(
    `  ${i + 1}. ${us.titre} (dépendants: ${us.nbDependants}, chaîne: ${
      us.chainLen
    })`
  );
});

// Nombre d'US par sprint
console.log("\n[STATS] Nombre d'US par sprint :");
sprints.forEach((sprint, i) => {
  console.log(`  Sprint ${i + 1} : ${sprint.us.length} US`);
});
