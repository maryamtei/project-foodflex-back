// This code uses the 'sequelize' module to define a data model for the 'contact' table.
// The 'Contact' model extends the 'Model' class provided by 'sequelize', allowing it to benefit from its features.
// The 'Contact' model represents the structure of the 'contact' table in the database.

// Import necessary modules.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnexion'); // Imports the database connection instance 

// Define the 'Contact' class that extends the 'Model' class.
class Contact extends Model { }

// Initialize the 'Contact' model with the attributes of the 'contact' table.
Contact.init({
    name: DataTypes.TEXT, // 'name' field of type TEXT
    email: DataTypes.TEXT, // 'email' field of type TEXT
    message: DataTypes.TEXT, // 'message' field of type TEXT
},
    {
        sequelize, // Uses the 'sequelize' connection instance to perform database operations.
        tableName: "contact"  // Name of the table in the database associated with this model.
    })

module.exports = Contact;  // Exports the 'Contact' model so that it can be used in other parts of the application.