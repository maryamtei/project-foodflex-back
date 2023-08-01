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
 * @param {addFavorite} request.body.required - Please provide the required information as specified in the following schema.
 * @returns {userInfo} 200 - Success message and response data.
 * @returns {errorSchema} 400 - Error message and details for invalid form data.
 * @returns {errorData} 409 - This favorite already exists !
 * @returns {errorData} 422 - Favorite object is missing one or more required properties.
 * @returns {errorData} 500 - Error message and details for server errors.
 */
router.post(`/favorite-add`, authentification, validator('body', validateAddFavoriteSchema), controllerWrapper(favoriteController.addFavorite));
/**
 * DELETE /favorite-delete/:id
 * @summary Delete a favorite
 * @tags Favorite
 * @security BasicAuth
 * @param {number} meal_id.query - Id of the meal.
 * @returns {userInfo} 200 - Success message and response data.
 * @returns {errorSchema} 400 - Error message and details for invalid form data.
 * @returns {errorData} 404 - Can not find favorite with id.
 * @returns {errorData} 500 - Error message and details for server errors.
 */
router.delete(`/favorite-delete/:id`, authentification, validator('params', validatedeleteFavoriteSchema), controllerWrapper(favoriteController.deleteFavorite));

module.exports = router;
