require("dotenv").config();
const { readBacklogCsv, extractUserStories } = require("./backlog-shared");
const axios = require("axios");

// Les variables sont maintenant dans .env
const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64");

async function createJiraIssue(story) {
  try {
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
          // Ajoute ici d'autres mappings si besoin (epic, capabilities, etc)
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

async function main() {
  const records = readBacklogCsv();
  const stories = extractUserStories(records);

  // Limite à 5 éléments pour test
  for (const story of stories.slice(0, 5)) {
    await createJiraIssue(story);
  }
}

main();
