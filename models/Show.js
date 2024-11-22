const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Show extends Model {}

Show.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'Show'
});

module.exports = Show;