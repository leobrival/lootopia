const fs = require("fs");
const { parse } = require("csv-parse/sync");

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
  console.log("✅ Toutes les dépendances pointent vers une US existante.");
} else {
  console.log("❌ Dépendances orphelines trouvées :");
  for (const o of orphelines) {
    console.log(`- "${o.us}" dépend de "${o.dependance}" (introuvable)`);
  }
}
