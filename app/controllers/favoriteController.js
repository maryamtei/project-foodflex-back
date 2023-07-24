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
      const error = {
        codeMessage: 1,
        message: 'This favorite already exists!'
    }
      res.status(400).json(error);
      throw new apiError('Ce favori existe déjà !', { statusCode: 400 });
    }

    if (!image || !name || !idDbMeal) {
      const error = {
        codeMessage: 2,
        message: 'Favorite object error'
    }
    res.status(422).json(error);
    throw new apiError(bodyErrors, { statusCode: 422 });
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
         codeMessage:100,
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
        const error = {
            codeMessage: 4,
            message: 'Can not find favorite with id ' + meal_id
        }
        res.status(404).json(error);
        throw new apiError('Can not find favorite with id ' + meal_id, { statusCode: 404 });
    } else {
        await favorite.destroy();
     const newUser = await newUserData(user_id);
        const response =  {
            codeMessage:101,
            message: 'Recipe delete to favorite',
            newUser
        }
        res.status(200).json(response);
    }
  }
};

module.exports = favoriteController;
