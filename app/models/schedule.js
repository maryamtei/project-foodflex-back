const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class Scheduling extends Model { }

Scheduling.init({
    week: DataTypes.INTEGER,
},
    {
        sequelize,
        tableName: "scheduling"
    })

module.exports = Scheduling;