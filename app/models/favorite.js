const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class Favorite extends Model {}

Favorite.init({
    idDbMeal: DataTypes.INT,
    name: DataTypes.TEXT,
    image: DataTypes.TEXT,
    position: DataTypes.INT,
},
{
    sequelize,
    tableName: "Favorite"
})

module.exports = Favorite;