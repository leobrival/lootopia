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

console.log(usList.map((u) => [u.titre, u.priorite]));

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

// --- Dépendance chain length (à placer AVANT usWithDependants) ---
function getDependencyChainLength(us, titreToUs, visited = new Set()) {
  if (visited.has(us.titre)) return 0;
  visited.add(us.titre);
  if (!us.dependances.length) return 0;
  let maxDepth = 0;
  for (const dep of us.dependances) {
    const depUs = titreToUs[dep];
    if (depUs) {
      maxDepth = Math.max(
        maxDepth,
        1 + getDependencyChainLength(depUs, titreToUs, new Set(visited))
      );
    }
  }
  return maxDepth;
}

// --- Map titre -> US (à placer AVANT usWithDependants) ---
const titreToUs = Object.fromEntries(usList.map((u) => [u.titre, u]));

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
console.log("\nExport CSV : sprint-planning.csv");

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
console.log("Titres mustShould uniques:", mustShouldTitles.size);
console.log("Titres mustShould total:", mustShould.length);
let doneUS = new Set();
let mvpSprint = 0;
for (let i = 0; i < sprints.length; i++) {
  for (const us of sprints[i].us) {
    if (mustShouldTitles.has(normalize(us.titre))) {
      doneUS.add(normalize(us.titre));
    }
  }
  console.log(
    `Sprint ${i + 1}: ${doneUS.size}/${
      mustShouldTitles.size
    } US Must+Should complétées`
  );
  if (doneUS.size === mustShouldTitles.size) {
    mvpSprint = i + 1;
    break;
  }
}
if (doneUS.size !== mustShouldTitles.size) {
  const missing = [...mustShouldTitles].filter((t) => !doneUS.has(t));
  console.log(
    `US Must+Should manquantes après ${sprints.length} sprints:`,
    missing
  );
}
console.log(
  `\nLe MVP (Must + Should) est complété à la fin du sprint ${mvpSprint}.`
);

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
console.log("\n--- Suggestions de refacto pour ces chaînes critiques ---");
usLongChains.slice(0, 5).forEach((us) => {
  console.log(
    `- ${us.titre} :\n  ➔ Suggestions :\n    • Découper l'US ou ses dépendances pour réduire la profondeur.\n    • Mocker les dépendances pour débloquer les suivantes.\n    • Revoir la nécessité de chaque dépendance (challenge métier/tech).\n    • Prioriser la livraison de cette US et de ses dépendances directes.`
  );
});
