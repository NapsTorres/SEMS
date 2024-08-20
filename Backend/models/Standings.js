const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance

const Standings = sequelize.define('Standings', {
  teamName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sportType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  season: {
    type: DataTypes.STRING,
    allowNull: false
  },
  collegeName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  tableName: 'standings', // Specify the table name if it is different from the model name
  timestamps: false // Disable timestamps if not using them
});

module.exports = Standings;
