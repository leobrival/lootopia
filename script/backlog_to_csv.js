const {
  parseBacklogMd,
  computeDependencyScore,
  exportCsv,
  escapeCsv,
} = require("./backlog-shared");
const path = require("path");
const fs = require("fs");

const BACKLOG_MD = path.join(__dirname, "../.memory-bank/strategic/backlog.md");
const CSV_OUT = path.join(__dirname, "../backlog.csv");

const usList = parseBacklogMd(BACKLOG_MD);
computeDependencyScore(usList);

const header = [
  "Theme",
  "Epic",
  "User Story",
  "Titre",
  "Estimation",
  "Priorité",
  "Type",
  "Capabilities",
  "Dépendances",
  "Nb dépendances",
  "Nb dépendants",
];

// Build a map titre -> dépendants count
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

const rows = usList.map((us) => [
  us.theme,
  us.epic,
  us.userStory,
  us.titre,
  us.estimation,
  us.priorite,
  us.type,
  us.capabilities,
  (us.dependances || []).join(";"),
  (us.dependances || []).length,
  titreToDependants[us.titre] || 0,
]);

exportCsv(rows, header, CSV_OUT);
console.log(`Exported ${usList.length} user stories to ${CSV_OUT}`);

// --- Export CSV backlog-critical.csv ---
const usCriticalHeader = [
  "Titre",
  "Nb dépendants",
  "Longueur chaîne",
  "Suggestions refacto",
];
const usCriticalRows = [];
const usWithDependants = usList.map((us) => ({
  titre: us.titre,
  nbDependants: titreToDependants[us.titre] || 0,
  chainLen: (us.dependances && us.dependances.length) || 0,
}));
usWithDependants.sort((a, b) => b.nbDependants - a.nbDependants);
const usLongChains = usWithDependants.filter((us) => us.chainLen > 1);
// Top 10 dépendants
usWithDependants.slice(0, 10).forEach((us) => {
  usCriticalRows.push([
    us.titre,
    us.nbDependants,
    us.chainLen,
    us.chainLen > 1
      ? "Découper/Mocker/Revoir dépendances/Prioriser livraison"
      : "",
  ]);
});
// Top 5 chaînes longues
usLongChains.slice(0, 5).forEach((us) => {
  usCriticalRows.push([
    us.titre,
    us.nbDependants,
    us.chainLen,
    "Découper/Mocker/Revoir dépendances/Prioriser livraison",
  ]);
});
const usCriticalPath = path.join(__dirname, "../backlog-critical.csv");
fs.writeFileSync(
  usCriticalPath,
  [usCriticalHeader.join(",")]
    .concat(usCriticalRows.map((r) => r.join(",")))
    .join("\n"),
  "utf-8"
);
// --- Console résumé minifié ---
console.log(`[STATS] US: ${usList.length}`);
console.log(`[STATS] Top 3 dépendants:`);
usWithDependants.slice(0, 3).forEach((us, i) => {
  console.log(
    `  ${i + 1}. ${us.titre} (dépendants: ${us.nbDependants}, chaîne: ${
      us.chainLen
    })`
  );
});
console.log(`[STATS] Top 3 chaînes longues:`);
usLongChains.slice(0, 3).forEach((us, i) => {
  console.log(
    `  ${i + 1}. ${us.titre} (chaîne: ${us.chainLen}, dépendants: ${
      us.nbDependants
    })`
  );
});
console.log(`[STATS] Exports: backlog.csv, backlog-critical.csv`);
