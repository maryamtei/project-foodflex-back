const Favorite = require('../models/favorite');
const User = require('../models/user');

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
            const user_id = req.params.id;
            const user = await User.findByPk({
                association: 'favorites'
            })
            const { name, image, position,idDbMeal} = req.body; //user_id envoyé par le front
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
