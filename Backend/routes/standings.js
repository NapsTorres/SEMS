const express = require('express');
const router = express.Router();
const Standings = require('../models/Standings');

// Add standing
router.post('/', async (req, res) => {
  try {
    const newStanding = await Standings.create(req.body);
    res.json(newStanding);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all standings
router.get('/', async (req, res) => {
  try {
    const standings = await Standings.findAll();
    res.json(standings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a single standing by ID
router.get('/:id', async (req, res) => {
  try {
    const standing = await Standings.findByPk(req.params.id);
    if (!standing) {
      return res.status(404).json({ msg: 'Standing not found' });
    }
    res.json(standing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a standing by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Standings.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedStanding = await Standings.findByPk(req.params.id);
      res.json(updatedStanding);
    } else {
      res.status(404).json({ msg: 'Standing not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a standing by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Standings.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ msg: 'Standing deleted' });
    } else {
      res.status(404).json({ msg: 'Standing not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
