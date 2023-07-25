const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion');

class Contact extends Model { }

Contact.init({
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    message: DataTypes.TEXT,
},
    {
        sequelize,
        tableName: "contact"
    })

module.exports = Contact;