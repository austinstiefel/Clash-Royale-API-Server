import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ClashRoyaleAPI } from '@varandas/clash-royale-api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const api = new ClashRoyaleAPI(`${process.env.CLASH_ROYALE_API_TOKEN}`);
const stats = express.Router();

app.use(cors());
app.use('/stats', stats);

// Define all Clan Routes
// Call getClans Method
stats.get('/clan/:name/:locationId?/:minMembers?/:maxMembers?/:minScore?/:limit?/:after?/:before?', async (req, res) => {
  try {
    const requestParams = {
      name: req.params.name,
      locationId: parseInt(req.params.locationId),
      minMembers: parseInt(req.params.minMembers),
      maxMembers: parseInt(req.params.maxMembers),
      minScore: parseInt(req.params.minScore),
      limits: parseInt(req.params.limit),
      after: parseInt(req.params.after),
      before: parseInt(req.params.before)
    };
    const clanSearch = await api.getClans(requestParams);
    res.json(clanSearch);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' })
  }
});
// Call getClanByTag Method
stats.get('/clan/:tag', async (req, res) => {
  try {
    const clanDetails = await api.getClanByTag(`#${req.params.tag}`)
    res.json(clanDetails);
  } catch (error) {
    res.status(500).json({ error: 'Cannot retrieve clan details, maybe try a different clan tag' })
  }
});
// Call getClanMembers Method
stats.get('/clan/:tag/members', async (req, res) => {
  try {
    const members = await api.getClanMembers(`#${req.params.tag}`)
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Cannot retrieve clan members' })
  }
});
// Call getClanCurrentWar Method
stats.get('/clan/:tag/war', async (req, res) => {
  try {
    const currentWar = await api.getClanCurrentWar(`#${req.params.tag}`)
    res.json(currentWar);
  } catch (error) {
    res.status(500).json({ error: 'Cannot retrieve current clan war details' })
  }
});
// Call getClanWarLog Method
stats.get('/clan/:tag/war/log', async (req, res) => {
  try {
    const warLog = await api.getClanWarlog(`#${req.params.tag}`)
    res.json(warLog);
  } catch (error) {
    res.status(500).json({ error: 'Cannot retrieve clans war log' })
  }
});
// Call getClanCurrentRiverRace Method
stats.get('/clan/:tag/war/river_race', async (req, res) => {
  try {
    const riverRace = await api.getClanCurrentRiverRace(`#${req.params.tag}`)
    res.json(riverRace);
  } catch (error) {
    res.status(500).json({ error: 'Cannot retrieve clans river race details' })
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});