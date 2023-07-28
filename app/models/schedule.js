const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class Schedule extends Model { }

Schedule.init({
    week: DataTypes.INTEGER,
},
    {
        sequelize,
        tableName: "schedule"
    })

module.exports = Schedule;