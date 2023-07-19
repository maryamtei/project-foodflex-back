const express = require('express');

/*------------ Controllers ---------------- */

const userController = require('../controllers/userController');
const scheduleController = require('../controllers/scheduleController');
const favoriteController = require('../controllers/favoriteController');
const { getAllFavorites } = require('../controllers/favoriteController');

/*------------ Validation_Schema ---------------- */

/* Favorite Schema */
const addFavoriteSchema = require('../validation/favoriteSchemas/addFavoriteSchema');
const deleteFavoriteSchema = require('../validation/favoriteSchemas/deleteFavoriteSchema');

const deleteUserSchema = require('../validation/userSchemas/deleteUserSchema');
const loginUserSchema = require('../validation/userSchemas/loginUserSchema');
const signUpUserSchema = require('../validation/userSchemas/signUpUserSchema');
const modifyUserSchema = require('../validation/userSchemas/modifyUserSchema');

const addScheduleSchema = require('../validation/scheduleSchemas/addScheduleSchema');

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

// router.delete(`/profil/:id`, userController.deleteUser) ADMIN
router.patch(`/profil/:id`, userController.modifyUser)
router.get(`/profil/:id`, userController.getOneUser)
router.post(`/signup`, userController.signUp)
router.post(`/login`, userController.login)

/* Schedule -> Planning */
// router.patch(`/planning/:id`, scheduleController.modifyScheduling)
router.post(`/schedule`, scheduleController.addSchedule)
router.delete(`/schedule/:id`, scheduleController.deleteSchedule)


/* User -> Favorites */
router.get(`/profil/:id/favori`, favoriteController.getAllFavorites)
router.post(`/profil/:id/favori`, favoriteController.addFavorite)
router.delete(`/profil/favori/:id`, favoriteController.deleteFavorite)

/* Export */

module.exports = router;