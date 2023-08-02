const { where } = require('sequelize');
const Favorite = require('../models/favorite');
const User = require('../models/user');
const { Schedule } = require('../models/associations');
const newUserData = require('../middlewares/userData');
const apiError = require('../errors/apiErrors');

/**
 * Controller for managing favorite recipes.
 * @namespace favoriteController
 */

const favoriteController = {
/**
 * Adds a recipe to the user's favorites.
 * @async
 * @function
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @throws {apiError} If the favorite already exists (status code: 400) or if the favorite object is missing required properties (status code: 422).
 * @returns {Promise<void>} A JSON response containing the message 'Recipe added to favorites' and updated user data.
 *
 */
  /**
  * @typedef {object} addFavorite
  * @property {string} idDbMeal
  * @property {string} name
  * @property {string} image
  * @property {number} position
  */
  addFavorite: async (req, res) => {
    const user_id = req.user.id;
    const { idDbMeal, name, image } = req.body;

    const existingFavorite = await Favorite.findOne({
      where: {
        user_id,
        idDbMeal
      }
    })

    if (existingFavorite) {
      throw new apiError('This favorite already exists !', { statusCode: 409 });
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
        codeMessage: 200,
        message: 'Recipe added to favorites',
        newUser
     }
     res.status(200).json(response);
  },

    /**
   * Deletes a recipe from the user's favorites.
   * @async
   * @function
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   * @throws {apiError} If the favorite with the specified ID is not found (status code: 404).
   * @returns {Promise<void>} A JSON response containing the message 'Recipe deleted from favorites' and updated user data.
   *
   */

  deleteFavorite: async (req, res) => {
    const meal_id = req.params.id;
    const user_id = req.user.id

    const favorite = await Favorite.findOne({
      where: {
        id: meal_id,
        user_id: user_id
      }
    });
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
