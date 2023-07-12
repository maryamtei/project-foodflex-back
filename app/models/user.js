const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class User extends Model {}

User.init({
    firstname: DataTypes.VARCHAR,
    lastname: DataTypes.INTEGER,
    email: DataTypes.TEXT,
    password: DataTypes.VARCHAR,
    email: DataTypes.TEXT,
},
{
    sequelize,
    tableName: "user"
})

module.exports = User;