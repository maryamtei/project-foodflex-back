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
 * @tags Contact
 * @param {contact} request.body.required - Please provide the required information as specified in the following schema.
 * @returns {responseContact} 200 - Success message and response data.
 * @returns {errorSchema} 400 - Error message and details for invalid form data.
 * @returns {errorData} 422 - The form fields are required.
 * @returns {errorData} 500 - Error message and details for server errors.
 */
router.post(`/contact`, validator('body', validateSubmitFormSchema), controllerWrapper(contactController.submitContactForm));


module.exports = router;