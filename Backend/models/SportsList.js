const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SportsList = sequelize.define('SportsList', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sportname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  slug: {  // Add this field
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Ensure slugs are unique
  },
  badge: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'sportlist',
  timestamps: false,
});

module.exports = SportsList;
