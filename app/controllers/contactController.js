const apiError = require('../errors/apiErrors');
const Contact = require('../models/contact');

const contactController = {
    submitContactForm: async (req, res) => {
        const { name, email, message } = req.body;
        console.log(email)
        console.log(name)
        console.log(message)
        if (!name || !email || !message) {
          throw new apiError('The form fields are required.', { statusCode: 422 });
        } else {
            const contact = await Contact.create({
                name,
                email,
                message
            });
            res.status(200).json(contact);
        }
      }
};

module.exports = contactController;