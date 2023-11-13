const { Model, DataTypes, INTEGER } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    id: {
      type: INTEGER,
      primarykey: true,
      autoIncrement: true,
      allowNull: false
    },
    category_name: {
      type: string,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
