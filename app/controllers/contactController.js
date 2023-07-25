const sequelize = require("../dbConnexion");
const apiError = require('../errors/apiErrors');
const Contact = require('../models/contact');

const contactController = {
    submitContactForm: async (req, res) => {
        const { name, email, message } = req.body;
      
        if (!name || !email || !message) {
          throw new apiError('The form fields are required.', { statusCode: 422 });
        } else {
          const contact = await Contact.create({
            name,
            email,
            message,
          });
          const response = {
            message: 'Message successfully sent!',
            data: contact 
          };
          res.status(200).json(response);
        }
      }
};

module.exports = contactController;