const express = require('express');

/*------------ Controllers ---------------- */

const favoriteController = require('../controllers/favoriteController');

/*------------ Validation_Schema ---------------- */

const validator = require('../validation/validator'); // Schema validator

const validateAddFavoriteSchema = require('../validation/favoriteSchemas/addFavoriteSchema');
const validatedeleteFavoriteSchema = require('../validation/favoriteSchemas/deleteFavoriteSchema');

/*------------ Middlewares ---------------- */

const authentification = require('../middlewares/authentification');

/* Controller Wrapper (refacto) */

const controllerWrapper = require('../middlewares/controllerWrapper');

/*------------ Routes ---------------- */
/* Router Express */
const router = express.Router();

router.post(`/favorite-add`, authentification, validator('body', validateAddFavoriteSchema), controllerWrapper(favoriteController.addFavorite));
router.delete(`/favorite-delete/:id`, authentification, validator('params', validatedeleteFavoriteSchema), controllerWrapper(favoriteController.deleteFavorite));

module.exports = router;
