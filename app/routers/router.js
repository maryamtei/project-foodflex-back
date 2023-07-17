const express = require('express');

/*------------ Controllers ---------------- */

const userController = require('../controllers/userController');
const scheduleController = require('../controllers/scheduleController');
const favoriteController = require('../controllers/favoriteController');

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

router.delete(`/profil/:id`, userController.deleteProfil)
router.patch(`/profil/:id`, userController.modifyUser)
router.get(`/profil/:id`, userController.getOneUser)
router.post(`/signup`, userController.signUp)
router.post(`/login`, userController.login)

/* Schedule -> Planning */
// router.patch(`/planning/:id`, scheduleController.modifyScheduling)
router.get(`/planning/:id`, scheduleController.getSchedule)

/* User -> Favorites */

router.get(`/profil/:id/favori`, favoriteController.getAllFavorites)
router.post(`/profil/:id/favori`, favoriteController.addFavorite)

/* Export */

module.exports = router;