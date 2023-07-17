const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class Favorite extends Model { }

Favorite.init({
    idDbMeal: DataTypes.TEXT,
    name: DataTypes.TEXT,
    image: DataTypes.TEXT,
    position: DataTypes.INTEGER,
},
    {
        sequelize,
        tableName: "favorite"
    })

module.exports = Favorite;