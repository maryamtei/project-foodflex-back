const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class Scheduling extends Model {}

Scheduling.init({
    week: DataTypes.STRING(30),
},
{
    sequelize,
    tableName: "scheduling"
})

module.exports = Scheduling;