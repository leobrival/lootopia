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
const CAPABILITIES_RE = /^Capabilities: \[(.+)\]/;
const DEPENDANCES_RE = /^Dépendances: ?(.*)/;
const US_HEADER_RE = /^#### User Story: (.+)/;

const rows = [];
let currentTheme = null;
let currentEpic = null;
let currentStory = null;
let currentEstimation = null;
let currentPriorite = null;
let currentPersona = null;
let currentType = null;
let currentCapabilities = null;
let currentDependances = null;
let currentTitle = null;
let pendingDependances = null;

const lines = fs.readFileSync(BACKLOG_MD, "utf-8").split("\n");
for (let line of lines) {
  line = line.trim();
  let m;
  if ((m = THEME_RE.exec(line))) {
    currentTheme = m[1];
  } else if ((m = EPIC_RE.exec(line))) {
    currentEpic = m[1];
  } else if ((m = US_HEADER_RE.exec(line))) {
    currentTitle = m[1].trim();
  } else if ((m = DEPENDANCES_RE.exec(line))) {
    pendingDependances = m[1]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .join(";");
  } else if ((m = USER_STORY_RE.exec(line))) {
    currentPersona = m[1];
    currentStory = m[2];
    currentEstimation = null;
    currentPriorite = null;
    currentType = null;
    currentDependances = null;
  } else if ((m = ESTIMATION_RE.exec(line))) {
    currentEstimation = m[1];
  } else if ((m = PRIORITE_RE.exec(line))) {
    currentPriorite = m[1];
  } else if ((m = TYPE_RE.exec(line))) {
    currentType = m[1];
  } else if (currentStory && currentPersona && currentPriorite && line === "") {
    if (!currentDependances && pendingDependances) {
      currentDependances = pendingDependances;
      pendingDependances = null;
    }
    rows.push([
      currentTheme,
      currentEpic,
      `${currentPersona}, ${currentStory}`,
      currentTitle,
      currentEstimation,
      currentPriorite,
      currentType || "",
      currentCapabilities ? currentCapabilities.join(";") : "",
      currentDependances || "",
    ]);
    currentStory = null;
    currentPersona = null;
    currentType = null;
    currentCapabilities = null;
    currentTitle = null;
    currentDependances = null;
    pendingDependances = null;
  } else if ((m = CAPABILITIES_RE.exec(line))) {
    currentCapabilities = m[1].split(",").map((s) => s.trim());
  }
  if ((m = USER_STORY_RE.exec(line)) && pendingDependances) {
    currentDependances = pendingDependances;
    pendingDependances = null;
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
  "Titre",
  "Estimation",
  "Priorité",
  "Type",
  "Capabilities",
  "Dépendances",
];
const csv = [header.map(escapeCsv).join(",")]
  .concat(rows.map((row) => row.map(escapeCsv).join(",")))
  .join("\n");

fs.writeFileSync(CSV_OUT, csv, "utf-8");
console.log(`Exported ${rows.length} user stories to ${CSV_OUT}`);
