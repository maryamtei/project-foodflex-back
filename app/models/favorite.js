const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class Favorite extends Model {}

Favorite.init({
    idDbMeal: DataTypes.INTEGER,
    name: DataTypes.VARCHAR(30),
    image: DataTypes.TEXT,
    position: DataTypes.INTEGER,
},
{
    sequelize,
    tableName: "Favorite"
})

module.exports = Favorite;