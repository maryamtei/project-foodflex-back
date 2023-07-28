const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class AuthToken extends Model { }

AuthToken.init({
    token: DataTypes.TEXT,
},
    {
        sequelize,
        tableName: "authTokens"
    })

module.exports = AuthToken;