import express from 'express';
import dotenv from 'dotenv';
import { ClashRoyaleAPI } from '@varandas/clash-royale-api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const api = new ClashRoyaleAPI(`${process.env.CLASH_ROYALE_API_TOKEN}`);
const stats = express.Router();

app.use('/stats', stats);

// Retrieve clan members from requested clan tag
stats.get('/clan/:tag/members', async (req, res) => {
  try {
    const members = await api.getClanMembers(`#${req.params.tag}`)
    res.json(members);
  } catch (error) {
    res.status(500).json({error: 'Something went wrong'})
  }
})
stats.get('/stats/clanMembers', async (req, res) => {
  try {
    const members = await api.getClanMembers('#LG0RQC89');
    res.json(members)
  } catch (error) {
    res.status(500).json({error: 'Something went wrong'})
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});