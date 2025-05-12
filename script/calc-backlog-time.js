const fs = require("fs");
const { parse } = require("csv-parse/sync");
const {
  estimationDays,
  SPRINT_HOURS,
  team,
  readBacklogCsv,
  extractUserStories,
} = require("./backlog-shared");

const csv = fs.readFileSync("backlog.csv", "utf8");
const records = parse(csv, { columns: true, skip_empty_lines: true });

const count = { XS: 0, S: 0, M: 0, L: 0, XL: 0 };
const capabilityCount = {};
let totalDays = 0;

const devs = {
  front: 0,
  back: 0,
  blockchain: 0,
};

for (const row of records) {
  const est = row.Estimation.trim();
  if (count[est] !== undefined) {
    count[est]++;
    totalDays += estimationDays[est];

    // Attribution par type
    const type = row.Type.toLowerCase();
    let devTypes = [];
    if (type.includes("front")) devTypes.push("front");
    if (type.includes("back")) devTypes.push("back");
    if (type.includes("blockchain")) devTypes.push("blockchain");
    if (devTypes.length === 0) continue; // skip si pas de type

    const share = estimationDays[est] / devTypes.length;
    for (const dev of devTypes) {
      devs[dev] += share;
    }

    if (row.Capabilities) {
      const caps = row.Capabilities.split(";")
        .map((c) => c.trim())
        .filter(Boolean);
      for (const cap of caps) {
        capabilityCount[cap] = (capabilityCount[cap] || 0) + 1;
      }
    }
  }
}

const totalHours = totalDays * 8;

const SPRINT_DAYS = 5; // 1 semaine = 5 jours ouvrés
const DEBT_START_SPRINT = 8;
const DEBT_RATIO = 0.1;

// Calcul du nombre de sprints nécessaires (arrondi supérieur)
const totalSprints = Math.ceil(totalHours / SPRINT_HOURS);

// Calcul du nombre de sprints impactés par la dette technique
const debtSprints = Math.max(0, totalSprints - (DEBT_START_SPRINT - 1));
const prodSprints = totalSprints - debtSprints;

// Temps perdu à cause de la dette technique (10% à partir du 8ème sprint)
const debtHours = debtSprints * SPRINT_HOURS * DEBT_RATIO;
const effectiveProdHours = totalHours - debtHours;
const effectiveProdDays = effectiveProdHours / 8;
const effectiveSprints = Math.ceil(effectiveProdHours / SPRINT_HOURS);

console.log("Nombre d'US par taille :", count);
console.log(
  `Temps total estimé (brut) : ${totalDays.toFixed(
    1
  )} jours (${totalHours.toFixed(1)} heures)`
);
console.log(`Nombre de sprints nécessaires (brut) : ${totalSprints}`);
console.log(
  `À partir du sprint ${DEBT_START_SPRINT}, 10% du temps est pris pour la dette technique.`
);
console.log(
  `Nombre de sprints impactés par la dette technique : ${debtSprints}`
);
console.log(`Heures perdues pour dette technique : ${debtHours.toFixed(1)}h`);
console.log(
  `Temps effectif de production : ${effectiveProdDays.toFixed(
    1
  )} jours (${effectiveProdHours.toFixed(1)} heures)`
);
console.log(
  `Nombre de sprints effectifs (après dette technique) : ${effectiveSprints}`
);

console.log("Répartition par dev (jours) :", {
  Front: devs.front.toFixed(2),
  Back: devs.back.toFixed(2),
  Blockchain: devs.blockchain.toFixed(2),
});
console.log("Répartition par dev (heures) :", {
  Front: (devs.front * 8).toFixed(1),
  Back: (devs.back * 8).toFixed(1),
  Blockchain: (devs.blockchain * 8).toFixed(1),
});

console.log("Répartition par capability :", capabilityCount);

// --- Sprint Planning (4 premiers sprints) ---

// 1. On prépare les US avec toutes les infos utiles
const usList = records.map((row, idx) => ({
  idx,
  titre: row.Titre,
  estimation: row.Estimation.trim(),
  estimationHours: estimationDays[row.Estimation.trim()] * 8,
  priorite: row.Priorité.trim().toLowerCase(),
  dependances: row["Dépendances"]
    ? row["Dépendances"]
        .split(";")
        .map((d) => d.trim())
        .filter(Boolean)
    : [],
  theme: row.Theme,
  epic: row.Epic,
  type: row.Type,
  capabilities: row.Capabilities,
  userStory: row["User Story"],
}));

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

// Puis on trie globalement par priorité
usListOrdered.sort((a, b) => {
  if (prioOrder[a.priorite] !== prioOrder[b.priorite])
    return prioOrder[a.priorite] - prioOrder[b.priorite];
  // Si même priorité, garder l'ordre Epic/estimation
  return 0;
});

// 3. Sprint planning avec gestion des dépendances
let sprints = [];
let done = new Set();
let backlog = [...usListOrdered];

for (let sprintNum = 1; sprintNum <= 4; sprintNum++) {
  let sprint = [];
  let sprintHours = 0;
  let available = backlog.filter((us) =>
    us.dependances.every(
      (dep) => done.has(dep) || backlog.find((u) => u.titre === dep) == null
    )
  );
  // On prend les US dispo dans l'ordre, tant qu'il reste de la place
  for (let i = 0; i < available.length; i++) {
    const us = available[i];
    if (sprintHours + us.estimationHours > SPRINT_HOURS) continue;
    sprint.push(us);
    sprintHours += us.estimationHours;
    done.add(us.titre);
    // On retire du backlog
    backlog = backlog.filter((u) => u.idx !== us.idx);
    // On recalcule les US disponibles (dépendances peuvent se débloquer)
    available = backlog.filter((us) =>
      us.dependances.every(
        (dep) => done.has(dep) || backlog.find((u) => u.titre === dep) == null
      )
    );
    i = -1; // restart la boucle sur le backlog restant
  }
  sprints.push(sprint);
  if (backlog.length === 0) break;
}

// 4. Affichage
console.log("\n--- Sprint Planning (4 premiers sprints) ---");
sprints.slice(0, 4).forEach((sprint, i) => {
  let sprintHours = sprint.reduce((sum, us) => sum + us.estimationHours, 0);
  console.log(`\nSprint ${i + 1} (${sprintHours.toFixed(1)}h):`);
  sprint.forEach((us) => {
    console.log(
      `- [${us.priorite.toUpperCase()}][${us.estimation}] ${us.titre} (${
        us.epic
      })`
    );
    if (us.dependances.length)
      console.log(`    Dépendances: ${us.dependances.join(", ")}`);
  });
});
