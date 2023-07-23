const { where } = require('sequelize');
const Favorite = require('../models/favorite');
const User = require('../models/user');
const { Schedule } = require('../models/associations');
const newUserData = require('../middlewares/userData');

const favoriteController = {
    addFavorite: async (req,res) => {
        try {
            const user_id = req.user.id;
            const {idDbMeal, name, image} = req.body; //idDbMeal envoyé par le front

            const existingFavorite = await Favorite.findOne({
                where: {
                    user_id,
                    idDbMeal
                  }
            })

            if(existingFavorite){
                const error = {
                    codeMessage: 1,
                    message: 'This favorite already exists!'
                }
                return res.status(400).json(error);
            }
            if (!image  || !name || !idDbMeal) {
                const error = {
                    codeMessage: 2,
                    message: 'Favorite object error'
                }
            return res.status(422).json(error);
            }else {
                await Favorite.create({
                    user_id,
                    image,
                    position:1,
                    name,
                    idDbMeal
                })
                const newUser = await newUserData(user_id);
                const response =  {
                    codeMessage:100,
                    message: 'Recipe added to favorites',
                    newUser
                }

                res.status(200).json(response);
            }

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    deleteFavorite: async (req, res) => {
        try {
            const meal_id = req.params.id;
            const user_id = req.user.id

            const favorite = await Favorite.findByPk(meal_id)
            if (!favorite) {
                const error = {
                    codeMessage: 4,
                    message: 'Can not find favorite with id ' + meal_id
                }
                res.status(404).json(error);
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
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    }
};

module.exports = favoriteController
