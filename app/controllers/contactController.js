const apiError = require('../errors/apiErrors');
const Contact = require('../models/contact');
const nodemailer = require('nodemailer');

const contactController = {

  /**
   * Send the contact form.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   * @throws {apiError} If any of the form fields are missing (response status 422).
   * @returns {Promise<void>} Returns a JSON response with created contact information (response status 200).
   */

   /**
   * @typedef {object} contact
   * @property {string} name
   * @property {string} message
   * @property {string} email
   */
   /**
   * @typedef {object} responseContact
   * @property {number} id
   * @property {string} name
   * @property {string} message
   * @property {string} email
   * @property {string} created_at
   * @property {string} modify_at
   */
    submitContactForm: async (req, res) => {
        const { name, email, message } = req.body;
        console.log(email)
        console.log(name)
        console.log(message)
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          secure: true,
          auth: {
            user: 'foodflexfoodflex@gmail.com',
            pass: process.env.EMAILPASSWORD
          },
          from: email
        });
        if (!name || !email || !message) {
          throw new apiError('The form fields are required.', { statusCode: 422 });
        } else {
          const info = await transporter.sendMail({
            from: email,
            to: "foodflexfoodflex@gmail.com",
            subject: "Contact from Foodflex website",
            text: `
                    Name: ${name}
                    Email: ${email}
                    Message: ${message}
                  `
          });
          console.log("Message sent: " + info.messageId)
          const contact = await Contact.create({
              name,
              email,
              message
          });

          const response =  {
            message: 'Message sent.',
            contact
          }
          res.status(200).json(response);
        }
  }
};

module.exports = contactController;