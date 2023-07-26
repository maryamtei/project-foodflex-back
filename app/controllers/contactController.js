const apiError = require('../errors/apiErrors');
const Contact = require('../models/contact');

const contactController = {

   /**
   * Envoie le formulaire de contact.
   * @param {object} req - L'objet de requête Express.
   * @param {object} res - L'objet de réponse Express.
   * @throws {apiError} Si l'un des champs du formulaire est manquant (statut de réponse 422).
   * @returns {Promise<void>} return response JSON with create contact informations (statut de réponse 200).
   */

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