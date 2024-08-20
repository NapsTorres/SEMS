const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Archive = sequelize.define('Archive', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  matchId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  team1Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  team2Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  team1Score: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  team2Score: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['scheduled', 'in-progress', 'completed', 'canceled'],
    allowNull: false,
    defaultValue: 'scheduled',
  },
  sporttype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  winner: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  elimination: {
    type: DataTypes.ENUM,
    values: ['Single', 'Double'],
    allowNull: false,
  },
  nextMatchId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tournamentRoundText: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  originalId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  tableName: 'archive',
  timestamps: false,
});

module.exports = Archive;
