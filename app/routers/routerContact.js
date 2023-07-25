const express = require('express');

/*------------ Controller ---------------- */

const contactController = require('../controllers/contactController');

/*------------ Validation_Schema ---------------- */

const validator = require('../validation/validator'); // Schema validator
// const validateSubmitFormSchema = require('../validation/');


/*------------ Middlewares ---------------- */

const controllerWrapper = require('../middlewares/controllerWrapper');

/*------------ Routes ---------------- */

const router = express.Router();

router.post(`/contact`, /*validator('body', validateSubmitFormSchema)*/ controllerWrapper(contactController.submitContactForm));


module.exports = router;