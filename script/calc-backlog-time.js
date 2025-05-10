const fs = require("fs");
const { parse } = require("csv-parse/sync");

// Estimations en jours pour chaque taille
const estimationDays = {
  XS: 0.75, // moyenne entre 0.5 et 1
  S: 1.5, // moyenne entre 1 et 2
  M: 3, // moyenne entre 2 et 4
  L: 4.5, // moyenne entre 4 et 5
  XL: 6, // moyenne entre 5 et 7
};

const csv = fs.readFileSync("backlog.csv", "utf8");
const records = parse(csv, { columns: true, skip_empty_lines: true });

const count = { XS: 0, S: 0, M: 0, L: 0, XL: 0 };
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
  }
}

const totalHours = totalDays * 8;

const SPRINT_HOURS = 40;
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
