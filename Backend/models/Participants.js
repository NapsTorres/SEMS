const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Team = require('./Teams'); // Import the Team model
const Match = require('./Matches'); // Import the Match model

const Participant = sequelize.define('Participant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  matchId: {
    type: DataTypes.INTEGER,
    references: {
      model: Match,
      key: 'id',
    },
    allowNull: false,
  },
  teamId: {
    type: DataTypes.INTEGER,
    references: {
      model: Team,
      key: 'id',
    },
    allowNull: false,
  },
  resultText: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isWinner: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['PLAYED', 'NO_SHOW', 'WALK_OVER', 'NO_PARTY'],
    allowNull: true,
  }
}, {
  tableName: 'participants',
  timestamps: false,
});

// Define associations
Participant.belongsTo(Match, { foreignKey: 'matchId' });
Participant.belongsTo(Team, { foreignKey: 'teamId' });

module.exports = Participant;
