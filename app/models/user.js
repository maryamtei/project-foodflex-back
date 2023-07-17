const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class User extends Model { }

User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.TEXT,
},
    {
        sequelize,
        tableName: "user"
    })

module.exports = User;