const express = require('express');
const router = express.Router();
const SportsList = require('../models/SportsList'); 

function generateSlug(sportname) {
  return sportname
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

router.post('/create', async (req, res) => {
  const { type, sportname, description } = req.body;
  const slug = generateSlug(sportname);
  try {
    const newSport = await SportsList.create({ type, sportname, description, slug });
    res.json(newSport);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/list', async (req, res) => {
  try {
    const sports = await SportsList.findAll();
    res.json(sports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const sport = await SportsList.findOne({ where: { slug } });
    if (!sport) {
      return res.status(404).send('Sport not found');
    }
    res.json(sport);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
