const express = require('express');

/*------------ Controller ---------------- */

const userController = require('../controllers/userController');

/*------------ Validation_Schema ---------------- */

const validator = require('../validation/validator'); // Schema validator
const validateLoginUserSchema = require('../validation/userSchemas/loginUserSchema');
const validateSignUpUserSchema = require('../validation/userSchemas/signUpUserSchema');
// const validateModifyUserSchema = require('../validation/userSchemas/modifyUserSchema');
// const validateDeleteUserSchema = require('../validation/userSchemas/deleteUserSchema');


/*------------ Middlewares ---------------- */

const authentification = require('../middlewares/authentification');
const controllerWrapper = require('../middlewares/controllerWrapper'); // Controller Wrapper (refacto)


/*------------ Routes ---------------- */

const router = express.Router();
/**
 * POST /signup
 * @summary signup
 * @tags User
 * @param {signup} request.body.required - ok
 * @returns {signup} 200 - Success message and response data.
 * @returns {object} 400 - Error message and details for invalid form data.
 * @returns {object} 400 - Error message and details for connexion problem.
 * @returns {object} 422 - Error message when the request body is incomplete or invalid.
 * @returns {object} 500 - Error message and details for server errors.
 */
router.post(`/signup`, validator('body', validateSignUpUserSchema), controllerWrapper(userController.signUp));
/**
 * POST /login
 * @summary login
 * @tags User
 * @param {login} request.body.required - ok
 * @returns {login} 200 - Success message and response data.
 * @returns {object} 400 - Error message and details for invalid form data.
 * @returns {object} 400 - Error message and details for connexion problem.
 * @returns {object} 422 - Error message when the request body is incomplete or invalid.
 * @returns {object} 500 - Error message and details for server errors.
 */
router.post(`/login`, validator('body', validateLoginUserSchema), controllerWrapper(userController.login));
/**
 * GET /user
 * @summary Get User informations via ID
 * @tags User
 * @security BasicAuth
 * @param {string} user_id.query - The name of the user submitting the contact form.
 * @returns {contact} 200 - Success message and response data.
 * @returns {object} 400 - Error message and details for invalid form data.
 * @returns {object} 500 - Error message and details for server errors.
 */
router.get(`/user`, authentification, controllerWrapper(userController.getUserInformation));
/**
 * PATCH /profil
 * @summary Modify a User
 * @tags User
 * @security BasicAuth
 * @param {userModify} request.body.required - Enter to modify user data
 * @returns {userModify} 200 - Success message and response data.
 * @returns {object} 400 - Error message and details for invalid form data.
 * @returns {object} 400 - Error message and details for connexion problem.
 * @returns {object} 422 - Error message when the request body is incomplete or invalid.
 * @returns {object} 500 - Error message and details for server errors.
 */
router.patch(`/profil`, authentification ,userController.modifyUser)
//router.get(`/profil/:id`, userController.getOneUser)
//router.delete(`/profil/:id`, userController.deleteUser)
router.get(`/logout`, authentification, controllerWrapper(userController.logout));


module.exports = router;
