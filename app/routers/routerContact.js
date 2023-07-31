const express = require('express');

/*------------ Controller ---------------- */

const contactController = require('../controllers/contactController');

/*------------ Validation_Schema ---------------- */

const validator = require('../validation/validator'); // Schema validator
const validateSubmitFormSchema = require('../validation/contactSchema/submitFormSchema');


/*------------ Middlewares ---------------- */

const controllerWrapper = require('../middlewares/controllerWrapper');

/*------------ Routes ---------------- */

const router = express.Router();

/**
 * POST /contact
 * @summary Submit a contact form
 * @tags Submit Contact form
 * @param {contact} request.body.required - ok
 * @returns {contact} 200 - Success message and response data.
 * @returns {object} 400 - Error message and details for invalid form data.
 * @returns {object} 500 - Error message and details for server errors.
 */
router.post(`/contact`, validator('body', validateSubmitFormSchema), controllerWrapper(contactController.submitContactForm));


module.exports = router;