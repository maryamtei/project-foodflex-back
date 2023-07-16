const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class User extends Model { }

User.init({
    firstname: DataTypes.STRING(64),
    lastname: DataTypes.STRING(64),
    password: DataTypes.STRING(64),
    email: DataTypes.TEXT,
},
    {
        sequelize,
        tableName: "user"
    })

module.exports = User;