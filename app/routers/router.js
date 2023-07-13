const express = require('express');

/*------------ Controllers ---------------- */

const userController = require('./controllers/userController');
const schedulingController = require('./controllers/schedulingController');
const favoriteController = require('./controllers/favoriteController');

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

router.delete(`/profil`, userController.deleteProfil)
router.patch(`/profil`, userController.modifyProfil)
router.get(`/profil`, userController.getProfil)
router.post(`/signup`, userController.signUp)
router.post(`/login`, userController.login)

/* Schedule -> Planning */
router.patch(`/planning/:id`, schedulingController.modifyScheduling)
router.get(`/planning/:id`, schedulingController.getSchedule)

/* User -> Favorites */

router.get(`/profil/favori`, favoriteController.getAllFavorites)
router.post(`/profil/favori`, favoriteController.addFavorite)

/* Export */

module.exports = router;