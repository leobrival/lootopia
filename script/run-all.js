#!/usr/bin/env node
const { execSync } = require("child_process");

function run(cmd) {
  console.log(`\n> ${cmd}`);
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (e) {
    console.error(`Erreur lors de l'exécution de : ${cmd}`);
    process.exit(1);
  }
}

run("node script/backlog_to_csv.js");
run("node script/check-dependencies.js");
run("node script/sprint-planning.js");
run("node script/calc-backlog-time.js");

console.log("\nExports CSV générés :");
console.log("- backlog.csv");
console.log("- sprint-planning.csv");
