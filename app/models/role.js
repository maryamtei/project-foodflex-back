const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class Role extends Model {}

Role.init({
    name: DataTypes.STRING(30),
},
{
    sequelize,
    tableName: "role"
})

module.exports = Role;