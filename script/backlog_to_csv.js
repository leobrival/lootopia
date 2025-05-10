const fs = require("fs");
const path = require("path");

const BACKLOG_MD = path.join(__dirname, "../.memory-bank/strategic/backlog.md");
const CSV_OUT = path.join(__dirname, "../backlog.csv");

const THEME_RE = /^## THEME: (.+)/;
const EPIC_RE = /^### Epic: (.+)/;
const USER_STORY_RE = /^- (En tant.*?), (je veux .+)/;
const ESTIMATION_RE = /^Estimation: (.+)/;
const PRIORITE_RE = /^Priorit[ée]: (.+)/;
const TYPE_RE = /^Type: (.+)/;

const rows = [];
let currentTheme = null;
let currentEpic = null;
let currentStory = null;
let currentEstimation = null;
let currentPriorite = null;
let currentPersona = null;
let currentType = null;

const lines = fs.readFileSync(BACKLOG_MD, "utf-8").split("\n");
for (let line of lines) {
  line = line.trim();
  let m;
  if ((m = THEME_RE.exec(line))) {
    currentTheme = m[1];
  } else if ((m = EPIC_RE.exec(line))) {
    currentEpic = m[1];
  } else if ((m = USER_STORY_RE.exec(line))) {
    currentPersona = m[1];
    currentStory = m[2];
    currentEstimation = null;
    currentPriorite = null;
    currentType = null;
  } else if ((m = ESTIMATION_RE.exec(line))) {
    currentEstimation = m[1];
  } else if ((m = PRIORITE_RE.exec(line))) {
    currentPriorite = m[1];
  } else if ((m = TYPE_RE.exec(line))) {
    currentType = m[1];
    if (currentStory && currentPersona && currentPriorite) {
      rows.push([
        currentTheme,
        currentEpic,
        `${currentPersona}, ${currentStory}`,
        currentEstimation,
        currentPriorite,
        currentType,
      ]);
      currentStory = null;
      currentPersona = null;
      currentType = null;
    }
  } else if (currentStory && currentPersona && currentPriorite && line === "") {
    // Si on a déjà les informations essentielles et qu'on rencontre une ligne vide,
    // on ajoute la user story même si on n'a pas trouvé de type
    rows.push([
      currentTheme,
      currentEpic,
      `${currentPersona}, ${currentStory}`,
      currentEstimation,
      currentPriorite,
      currentType || "",
    ]);
    currentStory = null;
    currentPersona = null;
    currentType = null;
  }
}

function escapeCsv(val) {
  if (val == null) return "";
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return '"' + val.replace(/"/g, '""') + '"';
  }
  return val;
}

const header = [
  "Theme",
  "Epic",
  "User Story",
  "Estimation",
  "Priorité",
  "Type",
];
const csv = [header.map(escapeCsv).join(",")]
  .concat(rows.map((row) => row.map(escapeCsv).join(",")))
  .join("\n");

fs.writeFileSync(CSV_OUT, csv, "utf-8");
console.log(`Exported ${rows.length} user stories to ${CSV_OUT}`);
