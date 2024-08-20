const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Users = sequelize.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  collegeName: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = Users;
