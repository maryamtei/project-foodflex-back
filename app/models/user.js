const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class User extends Model { }

User.init({
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    password: DataTypes.TEXT,
    email: DataTypes.TEXT,
},
    {
        sequelize,
        tableName: "user"
    })

module.exports = User;