const apiError = require('../errors/apiErrors');
const Contact = require('../models/contact');
const nodemailer = require('nodemailer');

const contactController = {

   /**
   * Envoie le formulaire de contact.
   * @param {object} req - L'objet de requête Express.
   * @param {object} res - L'objet de réponse Express.
   * @throws {apiError} Si l'un des champs du formulaire est manquant (statut de réponse 422).
   * @returns {Promise<void>} return response JSON with create contact informations (statut de réponse 200).
   */

   /**
   * @typedef {object} contact
   * @property {string} name
   * @property {string} message
   * @property {string} email
   */
    submitContactForm: async (req, res) => {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          secure: true,
          auth: {
            user: 'foodflexfoodflex@gmail.com',
            pass: process.env.EMAILPASSWORD
          },
        });
        console.log(process.env.EMAILPASSWORD)
        const { name, email, message } = req.body;
        console.log(email)
        console.log(name)
        console.log(message)
        if (!name || !email || !message) {
          throw new apiError('The form fields are required.', { statusCode: 422 });
        } else {
          const info = await transporter.sendMail({
            from: email,
            to: "foodflexfoodflex@gmail.com",
            subject: "Contact from Foodflex website",
            text: ` Name: ${name}
                    Email: ${email}
                    Message: ${message}`
          });
          console.log("Message sent: " + info.messageId)
          const contact = await Contact.create({
              name,
              email, //enlever la contrainte unique
              message
          });
            res.status(200).json(contact);
        }
  }
};

module.exports = contactController;