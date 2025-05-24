const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CategoryProduct = sequelize.define('CategoryProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
}, {
  tableName: 'category_product',
  timestamps: false,
});

module.exports = CategoryProduct; 