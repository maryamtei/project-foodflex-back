const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class Meal extends Model {}

Meal.init({
    idDbMeal: DataTypes.INT,
    name: DataTypes.TEXT,
    image: DataTypes.TEXT,
    position: DataTypes.INT,
},
{
    sequelize,
    tableName: "meal"
})

module.exports = Meal;