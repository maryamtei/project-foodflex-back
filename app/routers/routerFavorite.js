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
 * @summary Add a new favorite
 * @tags Favorite
 * @security BasicAuth
 * @param {addFavorite} request.body.required - Enter new favorite
 * @returns {addFavorite} 200 - Success message and response data.
 * @returns {object} 400 - Error message and details for invalid form data.
 * @returns {object} 400 - Error message and details for connexion problem.
 * @returns {object} 422 - Error message when the request body is incomplete or invalid.
 * @returns {object} 500 - Error message and details for server errors.
 */
router.post(`/favorite-add`, authentification, validator('body', validateAddFavoriteSchema), controllerWrapper(favoriteController.addFavorite));
/**
 * DELETE /favorite-delete/:id
 * @summary Delete a favorite
 * @tags Favorite
 * @security BasicAuth
 * @param {userModify} request.body.required - ok
 * @returns {userModify} 200 - Success message and response data.
 * @returns {object} 400 - Error message and details for invalid form data.
 * @returns {object} 400 - Error message and details for connexion problem.
 * @returns {object} 422 - Error message when the request body is incomplete or invalid.
 * @returns {object} 500 - Error message and details for server errors.
 */
router.delete(`/favorite-delete/:id`, authentification, validator('params', validatedeleteFavoriteSchema), controllerWrapper(favoriteController.deleteFavorite));

module.exports = router;
