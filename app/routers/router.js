const express = require('express');

/*------------ Controllers ---------------- */

const userController = require('../controllers/userController');
const scheduleController = require('../controllers/scheduleController');
const favoriteController = require('../controllers/favoriteController');
// const { getAllFavorites } = require('../controllers/favoriteController');

/*------------ Validation_Schema ---------------- */

/* Favorite Schema */
const validateAddFavoriteSchema = require('../validation/favoriteSchemas/addFavoriteSchema');
const validatedeleteFavoriteSchema = require('../validation/favoriteSchemas/deleteFavoriteSchema');

/* User Schema */
const validateDeleteUserSchema = require('../validation/userSchemas/deleteUserSchema');
const validateLoginUserSchema = require('../validation/userSchemas/loginUserSchema');
const validateSignUpUserSchema = require('../validation/userSchemas/signUpUserSchema');
const validateModifyUserSchema = require('../validation/userSchemas/modifyUserSchema');

/* User Schema */
const validateAddScheduleSchema = require('../validation/scheduleSchemas/addScheduleSchema');
const validateModifyScheduleSchema = require('../validation/scheduleSchemas/modifyScheduleSchema');
const validateDeleteScheduleSchema = require('../validation/scheduleSchemas/deleteScheduleSchema');

/*------------ Middlewares ---------------- */
const authentification = require('../middlewares/authentification')
/*
VERBE | ROUTE                                 | DESCRIPTION                                            |
|-------|---------------------------------------|--------------------------------------------------------|
| POST  | /contact                              | Envoie le formulaire de contact                         |
| GET   | /mettre route http dbMeal              | Affiche les recettes (nom, image, description)         |
| GET   | /mettre route http dbMeal/:id-recette  | Affiche la description d'une recette spécifique         |
*/
/*------------ Routes ---------------- */

const router = express.Router();

/* User -> Profil */

//router.delete(`/profil/:id`, userController.deleteUser)
//router.patch(`/profil/:id`, userController.modifyUser)
//router.get(`/profil/:id`, userController.getOneUser)
router.post(`/signup`, validateSignUpUserSchema(req.body),userController.signUp);
router.post(`/login`, validateLoginUserSchema(req.body) ,userController.login);
router.post(`/logout`,authentification,  userController.logout);
router.get(`/user`,authentification, userController.getUserInformation);

/* Schedule -> Planning */
// router.patch(`/planning/:id`, scheduleController.modifyScheduling)
router.post(`/schedule`, validateAddScheduleSchema(req.body) ,scheduleController.addSchedule);
router.patch(`/schedule/:id`,validateModifyScheduleSchema(req.body),scheduleController.modifySchedule);
router.delete(`/schedule/:id`, validateDeleteScheduleSchema(req.body), scheduleController.deleteSchedule);

/* User -> Favorites */
router.post(`/favorite-add`, validateAddFavoriteSchema(req.body), authentification, favoriteController.addFavorite)
router.delete(`/favorite-delete/:id`, validatedeleteFavoriteSchema(req.body), authentification, favoriteController.deleteFavorite)

/* Export */
module.exports = router;