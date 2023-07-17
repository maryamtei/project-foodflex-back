const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class Role extends Model { }

Role.init({
    name: DataTypes.TEXT,
},
    {
        sequelize,
        tableName: "role"
    })

module.exports = Role;