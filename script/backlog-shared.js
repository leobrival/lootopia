const fs = require("fs");
const { parse } = require("csv-parse/sync");

// Estimations en jours pour chaque taille
const estimationDays = {
  XS: 0.75,
  S: 1.5,
  M: 3,
  L: 4.5,
  XL: 6,
};

const SPRINT_HOURS = 40;

// Composition de l'équipe de développement
const team = {
  front: 1, // nombre de dev front
  back: 1, // nombre de dev back
  blockchain: 1, // nombre de dev blockchain
  // Ajoute d'autres rôles si besoin
};

function readBacklogCsv(path = "backlog.csv") {
  const csv = fs.readFileSync(path, "utf8");
  return parse(csv, { columns: true, skip_empty_lines: true });
}

function extractUserStories(records) {
  return records.map((row, idx) => ({
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
}

module.exports = {
  estimationDays,
  SPRINT_HOURS,
  team,
  readBacklogCsv,
  extractUserStories,
};
