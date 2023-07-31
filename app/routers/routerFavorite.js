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
/**
 * POST /favorite-add
 * @summary add favorite
 * @tags Favorites
 * @security BasicAuth
 * @param {addFavorite} request.body.required - ok
 * @returns {addFavorite} 200 - Success message and response data.
 * @returns {object} 400 - Error message and details for invalid form data.
 * @returns {object} 400 - Error message and details for connexion problem.
 * @returns {object} 422 - Error message when the request body is incomplete or invalid.
 * @returns {object} 500 - Error message and details for server errors.
 */
router.post(`/favorite-add`, authentification, validator('body', validateAddFavoriteSchema), controllerWrapper(favoriteController.addFavorite));
router.delete(`/favorite-delete/:id`, authentification, validator('params', validatedeleteFavoriteSchema), controllerWrapper(favoriteController.deleteFavorite));

module.exports = router;
