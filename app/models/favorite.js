const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class Favorite extends Model { }

Favorite.init({
    idDbMeal: DataTypes.STRING,
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    position: DataTypes.INTEGER,
},
    {
        sequelize,
        tableName: "Favorite"
    })

module.exports = Favorite;