const express = require('express');
const router = express.Router();
const Participants = require('../models/Participants');

// Add participant
router.post('/', async (req, res) => {
  try {
    const newParticipant = new Participants(req.body);
    const participant = await newParticipant.save();
    res.json(participant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all participants
router.get('/', async (req, res) => {
  try {
    const participants = await Participants.find();
    res.json(participants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
