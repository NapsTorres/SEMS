const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Teams = require('./Teams'); // Correct import for Team model

const Soccer = sequelize.define('Soccer', {
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
    references: {
      model: Teams,
      key: 'id',
    },
    allowNull: false,
  },
  team2Id: {
    type: DataTypes.INTEGER,
    references: {
      model: Teams,
      key: 'id',
    },
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
    defaultValue: 'scheduled', // default value
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

}, {
  tableName: 'soccer',
  timestamps: false,
});

// Define associations
Soccer.belongsTo(Teams, { as: 'Team1', foreignKey: 'team1Id' });
Soccer.belongsTo(Teams, { as: 'Team2', foreignKey: 'team2Id' });

module.exports = Soccer;
