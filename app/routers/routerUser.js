const express = require('express');

/*------------ Controller ---------------- */

const userController = require('../controllers/userController');

/*------------ Validation_Schema ---------------- */

const validator = require('../validation/validator'); // Schema validator
const validateLoginUserSchema = require('../validation/userSchemas/loginUserSchema');
const validateSignUpUserSchema = require('../validation/userSchemas/signUpUserSchema');
const validateModifyUserSchema = require('../validation/userSchemas/modifyUserSchema');
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
 * @param {signup} request.body.required - Please provide the required information as specified in the following schema
 * @returns {userInfoWithToken} 200 - Success message and response data. User have 52 weeks in the beggining
 * @returns {errorSchema} 400 - Error message and details for invalid form data.
 * @returns {errorData} 409 - User already exists.
 * @returns {errorData} 422 - Invalid password. Passwords must match.
 * @returns {errorData} 500 - Error message and details for server errors.
 */
router.post(`/signup`, validator('body', validateSignUpUserSchema), controllerWrapper(userController.signUp));
/**
 * POST /login
 * @summary login
 * @tags User
 * @param {login} request.body.required - Please provide the required information as specified in the following schema.
 * @returns {userInfoWithToken} 200 - Success message and response data.
 * @returns {errorSchema} 400 - Error message when the request body is incomplete or invalid.
 * @returns {errorData} 401 - Invalids credentials.
 * @returns {errorData} 500 - Error message and details for server errors.
 */
router.post(`/login`, validator('body', validateLoginUserSchema), controllerWrapper(userController.login));
/**
 * GET /user
 * @summary Get User informations via ID
 * @tags User
 * @security BasicAuth
 * @returns {userInfo} 200 - Success message and response data.
 * @returns {errorSchema} 401 - Invalid token, please reconnect.
 * @returns {errorData} 404 - User not found.
 * @returns {errorData} 500 - Error message and details for server errors.
 */
router.get(`/user`, authentification, controllerWrapper(userController.getUserInformation));
/**
 * PATCH /profil
 * @summary Modify a User
 * @tags User
 * @security BasicAuth
 * @param {userModify} request.body.required - Please provide the required information as specified in the following schema.
 * @returns {userInfo} 200 - Success message and response data.
 * @returns {errorSchema} 400 - Error message and details for invalid form data.
 * @returns {errorData} 404 - Can not find user with this id + {user_id}
 * @returns {errorData} 409 - Mail already exists.
 * @returns {errorData} 500 - Error message and details for server errors.
 */
router.patch(`/profil`, authentification, validator('body', validateModifyUserSchema), controllerWrapper(userController.modifyUser));
//router.get(`/profil/:id`, userController.getOneUser)
//router.delete(`/profil/:id`, userController.deleteUser)


module.exports = router;
