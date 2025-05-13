require("dotenv").config();
const { readBacklogCsv, extractUserStories } = require("./backlog-shared");
const axios = require("axios");

const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64");

const prioMap = {
  must: "Highest",
  should: "High",
  could: "Medium",
  "won't": "Lowest",
};

const THEME_OPTIONS = [
  "Expérience joueur",
  "Création & Gestion de contenu",
  "Écosystème & économique",
  "Partenariats & Business",
];

function normalizeTheme(input) {
  if (!input) return undefined;
  const cleaned = (input + "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "et")
    .replace(/[^a-z0-9 ]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  for (const opt of THEME_OPTIONS) {
    const optClean = opt
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&/g, "et")
      .replace(/[^a-z0-9 ]/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (cleaned === optClean) return opt;
  }
  console.warn(`[WARN] Thème non reconnu: '${input}' (aucun mapping Jira)`);
  return undefined;
}

async function findJiraEpicByName(epicName) {
  // Recherche par JQL sur le champ Epic Name (customfield_10011)
  const jql = `project = ${JIRA_PROJECT_KEY} AND issuetype = Epic AND \"Epic Name\" ~ \"${epicName.replace(
    /"/g,
    '"'
  )}\"`;
  const res = await axios.get(`${JIRA_BASE_URL}/rest/api/3/search`, {
    params: { jql, maxResults: 1, fields: "key,summary,customfield_10011" },
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
    },
  });
  if (res.data.issues && res.data.issues.length > 0) {
    return res.data.issues[0].key;
  }
  return null;
}

async function createJiraEpic(epicName) {
  // Vérifie d'abord si l'épique existe déjà
  const existingKey = await findJiraEpicByName(epicName);
  if (existingKey) {
    console.log(`🟣 Epic déjà existant: ${epicName} (${existingKey})`);
    return existingKey;
  }
  const res = await axios.post(
    `${JIRA_BASE_URL}/rest/api/3/issue`,
    {
      fields: {
        project: { key: JIRA_PROJECT_KEY },
        summary: epicName,
        issuetype: { name: "Epic" },
        customfield_10011: epicName, // Epic Name (à adapter selon ton Jira)
      },
    },
    {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return res.data.key; // ex: "LOOT-12"
}

async function findJiraIssueBySummary(summary) {
  const jql = `project = ${JIRA_PROJECT_KEY} AND summary ~ \"${summary.replace(
    /"/g,
    '"'
  )}\"`;
  const res = await axios.get(`${JIRA_BASE_URL}/rest/api/3/search`, {
    params: { jql, maxResults: 1, fields: "key,summary" },
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
    },
  });
  if (res.data.issues && res.data.issues.length > 0) {
    return res.data.issues[0].key;
  }
  return null;
}

async function createJiraIssue(story) {
  try {
    // const themeValue = story.theme ? normalizeTheme(story.theme) : undefined;
    // console.log("[DEBUG] Theme envoyé à Jira:", themeValue);
    const res = await axios.post(
      `${JIRA_BASE_URL}/rest/api/3/issue`,
      {
        fields: {
          project: { key: JIRA_PROJECT_KEY },
          summary: story.titre,
          description: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: story.userStory || "" }],
              },
            ],
          },
          issuetype: { name: "Story" },
          parent: story.epicKey ? { key: story.epicKey } : undefined,
          priority: { name: prioMap[story.priorite] || "Medium" },
          customfield_10081: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: story.userStory || "" }],
              },
            ],
          },
          customfield_10077: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: (story.dependances || []).join(", ") },
                ],
              },
            ],
          },
          // customfield_10048: themeValue ? { name: themeValue } : undefined, // Theme supprimé
          customfield_10080: story.estimation, // Estimation
        },
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`✅ Créé: ${story.titre} (${res.data.key})`);
  } catch (err) {
    console.error(
      `❌ Erreur sur "${story.titre}":`,
      err.response?.data || err.message
    );
  }
}

async function updateJiraIssue(issueKey, story) {
  // Récupère l'issue existante
  const res = await axios.get(`${JIRA_BASE_URL}/rest/api/3/issue/${issueKey}`, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
    },
    params: { fields: "summary,description,customfield_10014,priority" },
  });
  const current = res.data.fields;

  // Prépare les updates uniquement si nécessaire
  const updates = {};
  if (
    !current.description ||
    current.description.content?.[0]?.content?.[0]?.text !== story.userStory
  ) {
    updates.description = {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: story.userStory || "" }],
        },
      ],
    };
  }
  if (story.epicKey) {
    updates.parent = { key: story.epicKey };
  }
  if (
    !current.priority ||
    current.priority.name !== (prioMap[story.priorite] || "Medium")
  ) {
    updates.priority = { name: prioMap[story.priorite] || "Medium" };
  }

  if (Object.keys(updates).length === 0) {
    console.log(`✅ US déjà à jour: ${story.titre} (${issueKey})`);
    return;
  }

  // Fait l'update uniquement si nécessaire
  await axios.put(
    `${JIRA_BASE_URL}/rest/api/3/issue/${issueKey}`,
    { fields: updates },
    {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  console.log(`✏️  US mise à jour: ${story.titre} (${issueKey})`);
}

async function createJiraIssueIfNotExists(story) {
  const existingKey = await findJiraIssueBySummary(story.titre);
  if (existingKey) {
    await updateJiraIssue(existingKey, story);
    return;
  }
  await createJiraIssue(story);
}

function estimationToPoints(est) {
  return { XS: 1, S: 2, M: 3, L: 5, XL: 8 }[est] || 1;
}

async function main() {
  const records = readBacklogCsv();
  const stories = extractUserStories(records);

  // 1. Extraire la liste unique des épiques pour les 50 prochaines US à créer
  // On ne garde que les 50 premières US qui n'existent pas encore dans Jira
  const storiesToCreate = [];
  for (const story of stories) {
    const existingKey = await findJiraIssueBySummary(story.titre);
    if (!existingKey) {
      storiesToCreate.push(story);
      if (storiesToCreate.length === 50) break;
    }
  }
  if (storiesToCreate.length > 0) {
    console.log("Champs disponibles pour une US :");
    Object.entries(storiesToCreate[0]).forEach(([k, v]) => {
      console.log(`  ${k}: ${JSON.stringify(v)}`);
    });
  }
  const epicNames = Array.from(
    new Set(storiesToCreate.map((s) => s.epic).filter(Boolean))
  );
  const epicNameToKey = {};

  // 2. Créer chaque épique dans Jira (ou récupérer la clé si déjà existant)
  for (const epicName of epicNames) {
    try {
      const key = await createJiraEpic(epicName);
      epicNameToKey[epicName] = key;
    } catch (err) {
      console.error(
        `❌ Erreur création épique '${epicName}':`,
        err.response?.data || err.message
      );
    }
  }

  // Vérification de la création de toutes les épiques nécessaires
  const missingEpics = epicNames.filter((e) => !epicNameToKey[e]);
  if (missingEpics.length > 0) {
    console.warn(
      "⚠️  Les épiques suivantes n'ont pas pu être créées ou récupérées :"
    );
    missingEpics.forEach((e) => console.warn(`  - ${e}`));
  } else {
    console.log("✅ Toutes les épiques nécessaires sont prêtes dans Jira.");
  }

  // Affiche tous les champs disponibles dans Jira
  try {
    const res = await axios.get(`${JIRA_BASE_URL}/rest/api/3/field`, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
      },
    });
    console.log("\nChamps disponibles dans Jira :");
    res.data.forEach((field) => {
      console.log(`${field.id} | ${field.name} | ${field.schema?.type || ""}`);
    });
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des champs Jira :",
      err.response?.data || err.message
    );
  }

  // Affiche les champs d'une US existante (Story) dans Jira
  try {
    const jql = `project = ${JIRA_PROJECT_KEY} AND issuetype = Story ORDER BY created DESC`;
    const searchRes = await axios.get(`${JIRA_BASE_URL}/rest/api/3/search`, {
      params: { jql, maxResults: 1 },
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
      },
    });
    if (searchRes.data.issues && searchRes.data.issues.length > 0) {
      const issueKey = searchRes.data.issues[0].key;
      const issueRes = await axios.get(
        `${JIRA_BASE_URL}/rest/api/3/issue/${issueKey}`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
            Accept: "application/json",
          },
        }
      );
      console.log(`\nChamps de l'US Jira ${issueKey} :`);
      Object.entries(issueRes.data.fields).forEach(([k, v]) => {
        console.log(`  ${k}: ${JSON.stringify(v)}`);
      });
    } else {
      console.log(
        "Aucune US (Story) trouvée dans Jira pour afficher les champs."
      );
    }
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des champs d'une US Jira :",
      err.response?.data || err.message
    );
  }

  // 3. Associer chaque US à la clé Jira de son épique
  for (const story of storiesToCreate) {
    story.epicKey = story.epic ? epicNameToKey[story.epic] : undefined;
  }

  // 4. Créer seulement les 2 nouvelles US
  for (const story of storiesToCreate) {
    await createJiraIssueIfNotExists(story);
  }
}

// Patch a Story to assign it to an Epic (Jira Next-Gen)
async function updateStoryEpic(storyKey, epicKey, jiraBaseUrl, auth) {
  const url = `${jiraBaseUrl}/rest/api/3/issue/${storyKey}`;
  const body = {
    fields: {
      parent: { key: epicKey },
    },
  };
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error(`Failed to update ${storyKey}:`, await res.text());
  }
}

main();
