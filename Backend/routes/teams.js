const express = require('express');
const router = express.Router();
const Teams = require('../models/Teams');

// Add Teams
router.post('/create', async (req, res) => {
  try {
    const { name, logo, collegename } = req.body;

    // Debug: Check the incoming request data
    console.log('Received data:', req.body);

    if (!name || !collegename) {
      return res.status(400).json({ error: 'Name and College Name are required' });
    }

    const newTeam = await Teams.create({ name, logo, collegename });
    res.status(201).json(newTeam);
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'An error occurred while creating the team' });
  }
});

// Get all Teams
router.get('/list', async (req, res) => {
  try {
    const teams = await Teams.findAll();
    res.json(teams);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a specific team by slug
router.get('/:slug', async (req, res) => {
  try {
    const team = await Teams.findOne({ where: { slug: req.params.slug } });
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    console.error('Error fetching team details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a specific team by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, logo, collegename } = req.body;

    // Debug: Check the incoming request data
    console.log('Update data:', req.body);

    if (!name || !collegename) {
      return res.status(400).json({ error: 'Name and College Name are required' });
    }

    const [updated] = await Teams.update(
      { name, logo, collegename },
      { where: { id } }
    );

    if (updated) {
      const updatedTeam = await Teams.findOne({ where: { id } });
      res.status(200).json(updatedTeam);
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  } catch (error) {
    console.error('Error updating team:', error);
    res.status(500).json({ error: 'An error occurred while updating the team' });
  }
});

module.exports = router;
