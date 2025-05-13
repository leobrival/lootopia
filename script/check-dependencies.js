const fs = require("fs");
const { parse } = require("csv-parse/sync");
const path = require("path");

const csv = fs.readFileSync("backlog.csv", "utf8");
const records = parse(csv, { columns: true, skip_empty_lines: true });

// On récupère tous les titres d'US (colonne 'Titre')
const allTitles = new Set(
  records.map((row) => row["Titre"].trim().toLowerCase())
);

let orphelines = [];
for (const row of records) {
  if (!row["Dépendances"]) continue;
  const deps = row["Dépendances"]
    .split(";")
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
  for (const dep of deps) {
    if (!allTitles.has(dep)) {
      orphelines.push({
        us: row["User Story"],
        dependance: dep,
      });
    }
  }
}

if (orphelines.length === 0) {
  console.log("[OK] 0 dépendance orpheline.");
} else {
  console.warn(`[WARN] ${orphelines.length} dépendances orphelines.`);
  console.log("[DETAIL] Exemples de dépendances orphelines :");
  orphelines.slice(0, 10).forEach((o, i) => {
    console.log(
      `  ${i + 1}. US: '${o.us}' → dépendance inconnue: '${o.dependance}'`
    );
  });
  if (orphelines.length > 10) {
    console.log(`  ... (${orphelines.length - 10} autres non affichées)`);
  }
}
