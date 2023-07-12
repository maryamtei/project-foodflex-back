const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class Scheduling extends Model {}

Scheduling.init({
    week: DataTypes.TEXT,
},
{
    sequelize,
    tableName: "scheduling"
})

module.exports = Scheduling;