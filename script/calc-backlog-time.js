const fs = require("fs");
const { parse } = require("csv-parse/sync");
const {
  estimationDays,
  SPRINT_HOURS,
  team,
  readBacklogCsv,
  extractUserStories,
  parseBacklogMd,
} = require("./backlog-shared");
const path = require("path");

const csv = fs.readFileSync("backlog.csv", "utf8");
const records = parse(csv, { columns: true, skip_empty_lines: true });

const usList = parseBacklogMd();

const count = { XS: 0, S: 0, M: 0, L: 0, XL: 0 };
const capabilityCount = {};
let totalDays = 0;

const devs = {
  front: 0,
  back: 0,
  blockchain: 0,
};

for (const us of usList) {
  const est = us.estimation;
  if (count[est] !== undefined) {
    count[est]++;
    totalDays += estimationDays[est];
    // Attribution par type
    const type = (us.type || "").toLowerCase();
    let devTypes = [];
    if (type.includes("front")) devTypes.push("front");
    if (type.includes("back")) devTypes.push("back");
    if (type.includes("blockchain")) devTypes.push("blockchain");
    if (devTypes.length === 0) continue;
    const share = estimationDays[est] / devTypes.length;
    for (const dev of devTypes) {
      devs[dev] += share;
    }
    if (us.capabilities) {
      const caps = (us.capabilities || "")
        .split(";")
        .map((c) => c.trim())
        .filter(Boolean);
      for (const cap of caps) {
        capabilityCount[cap] = (capabilityCount[cap] || 0) + 1;
      }
    }
  }
}

const totalHours = totalDays * 8;

const SPRINT_DAYS = 5;
const DEBT_START_SPRINT = 8;
const DEBT_RATIO = 0.1;

const totalSprints = Math.ceil(totalHours / SPRINT_HOURS);
const debtSprints = Math.max(0, totalSprints - (DEBT_START_SPRINT - 1));
const prodSprints = totalSprints - debtSprints;
const debtHours = debtSprints * SPRINT_HOURS * DEBT_RATIO;
const effectiveProdHours = totalHours - debtHours;
const effectiveProdDays = effectiveProdHours / 8;
const effectiveSprints = Math.ceil(effectiveProdHours / SPRINT_HOURS);

const stats = {
  count,
  capabilityCount,
  totalDays,
  totalHours,
  totalSprints,
  debtSprints,
  prodSprints,
  debtHours,
  effectiveProdHours,
  effectiveProdDays,
  effectiveSprints,
  devs,
};

// --- Console résumé minifié ---
console.log(
  `[STATS] US: ${usList.length} | XS:${count.XS} S:${count.S} M:${count.M} L:${count.L} XL:${count.XL}`
);
console.log(
  `[STATS] Total: ${totalDays.toFixed(1)}j (${totalHours.toFixed(
    0
  )}h) | Sprints: ${totalSprints} (eff. ${effectiveSprints}) | Debt: ${debtHours.toFixed(
    0
  )}h`
);
console.log(
  `[STATS] Dev: Front:${devs.front.toFixed(1)}j (${(devs.front * 8).toFixed(
    0
  )}h) | Back:${devs.back.toFixed(1)}j (${(devs.back * 8).toFixed(
    0
  )}h) | Blockchain:${devs.blockchain.toFixed(1)}j (${(
    devs.blockchain * 8
  ).toFixed(0)}h)`
);
const topCaps = Object.entries(capabilityCount)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([k, v]) => `${k}:${v}`)
  .join(" | ");
console.log(`[STATS] Top capabilities: ${topCaps}`);

module.exports = { stats };
