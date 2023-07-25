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
      throw new apiError('This favorite already exists !', { statusCode: 400 });
    }

    if (!image || !name || !idDbMeal) {
      throw new apiError('Favorite object error !', { statusCode: 422 });
    }else {

    await Favorite.create({
         user_id,
         image,
         position:1,
         name,
         idDbMeal
     })
    }
     const newUser = await newUserData(user_id);
     const response =  {
         message: 'Recipe added to favorites',
         newUser
     }
     res.status(200).json(response);
  },

  deleteFavorite: async (req, res) => {
    const meal_id = req.params.id;
    const user_id = req.user.id

    const favorite = await Favorite.findByPk(meal_id)
    if (!favorite) {
        throw new apiError('Can not find favorite with id ' + meal_id, { statusCode: 404 });
    } else {
        await favorite.destroy();
     const newUser = await newUserData(user_id);
        const response =  {
            message: 'Recipe delete to favorite',
            newUser
        }
        res.status(200).json(response);
    }
  }
};

module.exports = favoriteController;
