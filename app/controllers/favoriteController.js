const Favorite = require('../models/favorite');

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
            const { name, image, position,idDbMeal} = req.body;
            //Ya un req.body qq part pour recup les infos
            // const favorite = await Favorite.build..utiliser build..?
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    }
};

module.exports = favoriteController
