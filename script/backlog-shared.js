const fs = require("fs");
const { parse } = require("csv-parse/sync");
const path = require("path");

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
  front: 2, // nombre de dev front
  back: 2, // nombre de dev back
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

function parseDependencies(depString) {
  if (!depString) return [];
  return depString
    .split(/;|,/)
    .map((d) => d.trim())
    .filter(Boolean);
}

function parseBacklogMd(
  mdPath = path.join(__dirname, "../.memory-bank/strategic/backlog.md")
) {
  const THEME_RE = /^## THEME: (.+)/;
  const EPIC_RE = /^### Epic: (.+)/;
  const USER_STORY_RE = /^- (En tant.*?), (je veux .+)/;
  const ESTIMATION_RE = /^Estimation: (.+)/;
  const PRIORITE_RE = /^Priorit[ée]: (.+)/;
  const TYPE_RE = /^Type: (.+)/;
  const CAPABILITIES_RE = /^Capabilities: \[(.+)\]/;
  const DEPENDANCES_RE = /^Dépendances: ?(.*)/;
  const US_HEADER_RE = /^#### User Story: (.+)/;

  const lines = fs.readFileSync(mdPath, "utf-8").split("\n");
  const usList = [];
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
      pendingDependances = m[1];
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
    } else if (
      currentStory &&
      currentPersona &&
      currentPriorite &&
      line === ""
    ) {
      if (!currentDependances && pendingDependances) {
        currentDependances = pendingDependances;
        pendingDependances = null;
      }
      const estimation = currentEstimation ? currentEstimation.trim() : "";
      const priorite = currentPriorite
        ? currentPriorite.trim().toLowerCase()
        : "";
      const dependances = parseDependencies(currentDependances || "");
      const capabilitiesArr = currentCapabilities || [];
      usList.push({
        idx: usList.length,
        theme: currentTheme,
        epic: currentEpic,
        userStory: `${currentPersona}, ${currentStory}`,
        titre: currentTitle,
        estimation,
        estimationHours: estimationDays[estimation]
          ? estimationDays[estimation] * 8
          : 0,
        priorite,
        type: currentType || "",
        capabilities: capabilitiesArr.join(";"),
        capabilitiesArr,
        dependances,
      });
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
  return usList;
}

function buildTitreToUsMap(usList) {
  return Object.fromEntries(usList.map((u) => [u.titre, u]));
}

function computeDependencyScore(usList) {
  const titreToUs = buildTitreToUsMap(usList);
  function countDependants(titre, visited = new Set()) {
    if (visited.has(titre)) return 0;
    visited.add(titre);
    let count = 0;
    for (const u of usList) {
      if ((u.dependances || []).includes(titre)) {
        count += 1 + countDependants(u.titre, visited);
      }
    }
    return count;
  }
  for (const us of usList) {
    us.dependencyScore = countDependants(us.titre);
  }
}

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

function escapeCsv(val) {
  if (val == null) return "";
  val = String(val);
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return '"' + val.replace(/"/g, '""') + '"';
  }
  return val;
}

function exportCsv(rows, header, outPath) {
  const csv = [header.map(escapeCsv).join(",")]
    .concat(rows.map((row) => row.map(escapeCsv).join(",")))
    .join("\n");
  fs.writeFileSync(outPath, csv, "utf-8");
}

module.exports = {
  estimationDays,
  SPRINT_HOURS,
  team,
  readBacklogCsv,
  extractUserStories,
  parseBacklogMd,
  computeDependencyScore,
  getDependencyChainLength,
  exportCsv,
};
