const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class Role extends Model {}

Role.init({
    name: DataTypes.VARCHAR,
},
{
    sequelize,
    tableName: "role"
})

module.exports = Role;