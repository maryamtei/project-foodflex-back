const { where } = require('sequelize');
const Favorite = require('../models/favorite');
const User = require('../models/user');

const favoriteController = {

    getAllFavorites: async (req, res) => { //Fonctionne
        try {
            const user_id = req.params.id;
            const Favoris = await Favorite.findAll({
                where: { user_id },
                /*
                include: {
                    association: 'users', //Pour récupérer les favorites du user correspondant
                }
                */
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
            let tabFavoris = [];
            const user = await User.findOne({
                where: {id: user_id},
                include: 'favorites'
            });

            if (!user) {
                return res.status(404).json('Utilisateur introuvable');
            }

            const { name, image, position,idDbMeal} = req.body; //idDbMeal envoyé par le front

            const existingFavorite = await Favorite.findOne({
                where: {
                    user_id,
                    idDbMeal
                  }
            })

            if(existingFavorite){
                return res.status(400).json('Ce favori existe déjà !');
            }

            if (!image || !position || !name || !idDbMeal) {
                const bodyErrors = [];
                if (!image) { bodyErrors.push('image cannot be empty!'); }
                if (!position) { bodyErrors.push('position cannot be empty!'); }
                if (!name) { bodyErrors.push('name cannot be empty!'); }
                if (!idDbMeal) { bodyErrors.push('idDbMeal cannot be empty!'); }

            return res.status(422).json(bodyErrors);
            }else {
                const newFavori = await Favorite.create({
                    user_id,
                    image,
                    position,
                    name,
                    idDbMeal,
                })
                tabFavoris.push(newFavori)
                res.status(200).json(tabFavoris);
            }

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    deleteFavorite: async (req, res) => {
        try {
            const user_id = req.params.id;

            const { idDbMeal } = req.body

            const user = await User.findOne({
                where: {id: user_id},
                include: 'favorites'
            });

            if (!user) {
                return res.status(404).json('Utilisateur introuvable');
            }

            const favorite = await Favorite.findOne({
                where: {
                    user_id,
                    idDbMeal
                  }
            })
            if (!favorite) {
                res.status(404).json('Can not find favorite with id ' + idDbMeal);
            } else {
                await favorite.destroy();
                res.status(200).json('Le favori ' + idDbMeal + " à bien été effacé");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    }
};

module.exports = favoriteController
