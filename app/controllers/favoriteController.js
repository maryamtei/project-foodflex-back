const { where } = require('sequelize');
const Favorite = require('../models/favorite');
const User = require('../models/user');
const { Schedule } = require('../models/associations');
const newUserData = require('../middlewares/userData');
const apiError = require('../errors/apiErrors');

const favoriteController = {
  addFavorite: async (req, res) => {
    const user_id = req.user.id;
    const { idDbMeal, name, image } = req.body; //idDbMeal envoyé par le front

    const existingFavorite = await Favorite.findOne({
      where: {
        user_id,
        idDbMeal
      }
    })

    if (existingFavorite) {
      // return res.status(400).json('Ce favori existe déjà !');
      throw new apiError('Ce favori existe déjà !', { statusCode: 400 });
    }

    if (!image || !name || !idDbMeal) {
      const bodyErrors = [];
      if (!image) { bodyErrors.push('image cannot be empty!'); }
      if (!name) { bodyErrors.push('name cannot be empty!'); }
      if (!idDbMeal) { bodyErrors.push('idDbMeal cannot be empty!'); }

      // return res.status(422).json(bodyErrors);
      throw new apiError(bodyErrors, { statusCode: 422 });
    } else {
      await Favorite.create({
        user_id,
        image,
        position: 1,
        name,
        idDbMeal
      })

      const newUser = await newUserData(user_id);
      console.log("ajout dans la bdd")
      res.status(200).json({ status: "ok", user: newUser });
      // throw new apiError({ status: "ok", user: newUser }, { statusCode: 200 });
    }
  },

  deleteFavorite: async (req, res) => {
    const meal_id = req.params.id;
    const user_id = req.user.id

    /*
    const user = await User.findOne({
        where: {id: user_id},
        include: 'favorites'
    });
    */
    // if (!user) {
    //     return res.status(404).json('Utilisateur introuvable');
    // }

    const favorite = await Favorite.findByPk(meal_id)
    console.log(favorite)
    if (!favorite) {
      // res.status(404).json('Can not find favorite with id ' + meal_id);
      throw new apiError('Can not find favorite with id ' + meal_id, { statusCode: 404 });
    } else {
      await favorite.destroy();

      const newUser = await newUserData(user_id);
      console.log("suppression dans la bdd")
      res.status(200).json({ status: "ok", user: newUser });
      // throw new apiError({ status: "ok", user: newUser }, { statusCode: 200 });
    }
  }
};

module.exports = favoriteController;
