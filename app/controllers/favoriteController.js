const Favorite = require('../models/favorite');
const User = require('../models/user');
const generateAuthTokens = require('../middlewares/generateAuthTokens')

const favoriteController = {

    getAllFavorites: async (req, res) => {
        try {
            const Favoris = await Favorite.findAll({
                include: {
                    association: 'user', //Pour récupérer les favorites du user correspondant
                }
            });
            console.log(Favoris)
            res.status(200).json(Favoris);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    addFavorite: async (req,res) => {
        try {
            const user = await User.findByPk()
            const { name, image, position,idDbMeal, user_id} = req.body; //user_id envoyé par le front
            // findbypk de user on récup favoris et profil
            // findOne pour verif

            // if exist alors on push pas else on push
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    }
};

module.exports = favoriteController
