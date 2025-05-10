const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Your Discord Guild ID (this remains the same)
const GUILD_ID = '1370488422535266535';  // Replace with your Discord Guild ID

app.get('/check-verification', async (req, res) => {
  const robloxId = req.query.robloxId;
  if (!robloxId) {
    return res.status(400).json({ error: "Missing robloxId" });
  }

  const url = `https://verify.eryn.io/api/guilds/${GUILD_ID}/roblox-to-discord/${robloxId}`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    if (data.status === "ok") {
      return res.json({ verified: true, discordId: data.discordId });
    } else {
      return res.json({ verified: false });
    }
  } catch (err) {
    console.error("Error contacting Rover API:", err);
    return res.status(500).json({ error: "Failed to contact Rover" });
  }
});

// Vercel requires a handler for deployment
module.exports = app;
