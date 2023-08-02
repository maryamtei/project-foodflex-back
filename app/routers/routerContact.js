// Import necessary modules.
const express = require('express'); // Imports the 'express' module to create and configure the router.

/*------------ Controller ---------------- */

// Import the 'contactController' module that contains the functions to handle contact-related operations.
const contactController = require('../controllers/contactController');

/*------------ Validation_Schema ---------------- */

// Import necessary modules for schema validation.
const validator = require('../validation/validator'); // Imports the 'validator' function used for schema validation.
const validateSubmitFormSchema = require('../validation/contactSchema/submitFormSchema'); // Imports the schema used to validate the 'submitForm' request.


/*------------ Middlewares ---------------- */

// Import necessary middlewares.
const controllerWrapper = require('../middlewares/controllerWrapper'); // Imports the 'controllerWrapper' middleware.

/*------------ Routes ---------------- */

// Create an instance of the 'express.Router' to define the routes for contact-related operations.
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

// Define the route for submitting the contact form.
// It uses the 'validator' middleware to validate the request body against the 'submitFormSchema'.
// The 'controllerWrapper' middleware is used to handle any errors that may occur during the execution of the 'submitContactForm' function in 'contactController'.

router.post(`/contact`, validator('body', validateSubmitFormSchema), controllerWrapper(contactController.submitContactForm));

// Export the router to be used in other parts of the application.
module.exports = router;