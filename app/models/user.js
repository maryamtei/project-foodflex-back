const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class User extends Model { }

User.init({
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
    password: DataTypes.TEXT,
    email: DataTypes.TEXT,
},
    {
        sequelize,
        tableName: "user"
    })

module.exports = User;