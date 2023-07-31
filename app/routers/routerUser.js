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

router.post(`/signup`, validator('body', validateSignUpUserSchema), controllerWrapper(userController.signUp));
router.post(`/login`, validator('body', validateLoginUserSchema), controllerWrapper(userController.login));
router.get(`/user`, authentification, controllerWrapper(userController.getUserInformation));
//router.delete(`/profil/:id`, userController.deleteUser)
router.patch(`/profil`, authentification ,userController.modifyUser)
//router.get(`/profil/:id`, userController.getOneUser)

module.exports = router;
