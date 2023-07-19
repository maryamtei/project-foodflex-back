const express = require('express');

/*------------ Controllers ---------------- */

const userController = require('../controllers/userController');
const scheduleController = require('../controllers/scheduleController');
const favoriteController = require('../controllers/favoriteController');
const { getAllFavorites } = require('../controllers/favoriteController');

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

router.delete(`/profil/:id`, userController.deleteUser)
router.patch(`/profil/:id`, userController.modifyUser)
router.get(`/profil/:id`, userController.getOneUser)
router.post(`/signup`, userController.signUp)
router.post(`/login`, userController.login)
router.post(`/logout`,authentification, userController.logout)
router.get(`/user`,authentification, userController.getUserInformation)

/* Schedule -> Planning */
// router.patch(`/planning/:id`, scheduleController.modifyScheduling)
router.post(`/schedule`, scheduleController.addSchedule)
router.delete(`/schedule/:id`, scheduleController.deleteSchedule)


/* User -> Favorites */

router.get(`/profil`, authentification, favoriteController.getAllFavorites)
router.post(`/profil`, authentification, favoriteController.addFavorite)
router.delete(`/profil/:id/favori`, favoriteController.deleteFavorite)

/* Export */

module.exports = router;