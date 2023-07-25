const express = require('express');

/*------------ Controller ---------------- */

const contactController = require('../controllers/contactController');

/*------------ Validation_Schema ---------------- */




/*------------ Middlewares ---------------- */

const controllerWrapper = require('../middlewares/controllerWrapper');

/*------------ Routes ---------------- */

const router = express.Router();

router.post(`/contact`, controllerWrapper(contactController.submitContactForm));


module.exports = router;