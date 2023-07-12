const express = require('express');

/*------------ Controllers ---------------- */

const userController = require('./controllers/userController');
const schedulingController = require('./controllers/schedulingController');

/*------------ Routes ---------------- */

const router = express.Router();

/* User -> Profil */

router.get(`/profil/favori`, userController.getAllFavorites)
router.post(`/profil/favori`, userController.AddFavorite)
router.delete(`/profil`, userController.deleteProfil)
router.patch(`/profil`, userController.modifyProfil)
router.get(`/profil`, userController.getProfil)
router.post(`/signup`, userController.signUp)
router.post(`/login`, userController.login)

/* Schedule -> Planning */


/* Export */

module.exports = router;