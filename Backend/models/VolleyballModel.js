const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Teams = require('./Teams');
const Archive = require('./Archive'); // Import Archive model

const Volleyball = sequelize.define('Volleyball', {
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
}, {
  tableName: 'volleyball',
  timestamps: false,
  hooks: {
    afterCreate: async (volleyball, options) => {
      try {
        await Archive.create({
          matchId: volleyball.matchId,
          team1Id: volleyball.team1Id,
          team2Id: volleyball.team2Id,
          team1Score: volleyball.team1Score,
          team2Score: volleyball.team2Score,
          status: volleyball.status,
          sporttype: volleyball.sporttype,
          date: volleyball.date,
          winner: volleyball.winner,
          elimination: volleyball.elimination,
          nextMatchId: volleyball.nextMatchId,
          tournamentRoundText: volleyball.tournamentRoundText,
          originalId: volleyball.id,
        });
        console.log('Record successfully inserted into Archive');
      } catch (error) {
        console.error('Error inserting record into Archive:', error);
      }
    },
  },
});

// Define associations
Volleyball.belongsTo(Teams, { as: 'Team1', foreignKey: 'team1Id' });
Volleyball.belongsTo(Teams, { as: 'Team2', foreignKey: 'team2Id' });

module.exports = Volleyball;
