const express = require('express');
const router = express.Router();
const Volleyball = require('../models/VolleyballModel');
const Teams = require('../models/Teams');

// Create a new match
router.post('/create', async (req, res) => {
    const { team1Id, team2Id, sporttype, date, status, tournamentRoundText } = req.body;
    try {
      const newMatch = await Volleyball.create({ matchId, team1Id, team2Id, sporttype, date, status, tournamentRoundText });
      res.json(newMatch);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  // Create multiple matches
  router.post('/create-bulk', async (req, res) => {
    const matches = req.body.matches;
    try {
      const newMatches = await Volleyball.bulkCreate(matches);
      res.json(newMatches);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // Get all matches
  router.get('/list', async (req, res) => {
    try {
      const matches = await Volleyball.findAll({
        include: [
          { model: Teams, as: 'Team1', attributes: ['id', 'collegename', 'logo'] },
          { model: Teams, as: 'Team2', attributes: ['id', 'collegename', 'logo'] }
        ]
      });
      res.json(matches);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  router.get('/match-list', async (req, res) => {
    try {
      // Fetch matches from database
      const matches = await Volleyball.findAll({
        include: [
          { model: Teams, as: 'Team1', attributes: ['id', 'name'] },
          { model: Teams, as: 'Team2', attributes: ['id', 'name'] }
        ]
      });
  
      // Format the matches as per the specified structure
      const formattedMatches = matches.map(match => ({
        id: match.matchId,
        team1Score: match.team1Score,
        team2Score: match.team2Score,
        status: match.status,
        sporttype: match.sporttype,
        date: match.date.toISOString().split('T')[0], // Format date as 'YYYY-MM-DD'
        nextMatchId: match.nextMatchId,
        tournamentRoundText: match.tournamentRoundText,
        participants: [
          { 
            name: match.Team1 && match.Team1.name ? match.Team1.name : 'TBA', // Check if match.Team1 and match.Team1.name are not null/undefined
            resultText: match.status === 'scheduled' ? 'TBA' : (match.team1Score > match.team2Score ? 'Won' : 'Lost'),
            isWinner: match.status !== 'scheduled' && match.team1Score > match.team2Score,
            status: match.status !== 'scheduled' ? 'PLAYED' : 'SCHEDULED' 
          },
          { 
            name: match.Team2 && match.Team2.name ? match.Team2.name : 'TBA', // Check if match.Team2 and match.Team2.name are not null/undefined
            resultText: match.status === 'scheduled' ? 'TBA' : (match.team2Score > match.team1Score ? 'Won' : 'Lost'),
            isWinner: match.status !== 'scheduled' && match.team2Score > match.team1Score,
            status: match.status !== 'scheduled' ? 'PLAYED' : 'SCHEDULED' 
          }
        ]
      }));
      
      
      console.log(formattedMatches);
  
      // Send the formatted matches as JSON response
      res.json(formattedMatches);
    } catch (err) {
      console.error('Error fetching matches:', err);
      res.status(500).json({ error: 'Failed to fetch matches' });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const match = await Volleyball.findOne({
        where: { id: req.params.id },
        include: [
          { model: Teams, as: 'Team1' },
          { model: Teams, as: 'Team2' },
        ],
      });
      
      if (!match) {
        return res.status(404).json({ msg: 'Match not found' });
      }
      
      res.json(match);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  router.put('/:id', async (req, res) => {
    const { team1Score, team2Score, status } = req.body;
  
    try {
  
      const match = await Volleyball.findOne({
        where: { id: req.params.id },
        include: [
          { model: Teams, as: 'Team1' },
          { model: Teams, as: 'Team2' },
        ],
      });
  
      if (!match) {
        return res.status(404).json({ msg: 'Match not found' });
      }
  
      match.team1Score = team1Score;
      match.team2Score = team2Score;
      match.status = status;
  
      await match.save();
  
      res.json(match); // Return updated match data
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  
  module.exports = router;