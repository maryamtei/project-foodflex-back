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
            let bodyErrors = [];
            let tabFavoris = [];
            const user = await User.findOne(user_id,{
                include: 'favorites'
            });

            const { name, image, position,idDbMeal} = req.body; //user_id envoyé par le front

            if(favoris){
                return res.status(400).json('Ce favori existe déjà !');
            }

            if(!image) { bodyErrors.push('image can not be empty !') }
            if(!position) { bodyErrors.push('position can not be empty !') }
            if(!name) { bodyErrors.push('name can not be empty !') }
            if(!idDbMeal) { bodyErrors.push('idDbMeal can not be empty !') }

            if(bodyErrors.length) {
                res.status(422).json(bodyErrors);
            }else{
                const newFavori = await user.create(user_id,{
                    image,
                    position,
                    name,
                    idDbMeal,
                })
                tabFavoris.push(newFavori)
            }

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    deleteFavorite: async (req, res) => {
        try {
            const favorite_id = req.params.id;
            const favorite = await Favorite.findByPk(favorite_id, {
                include: ['user']
            });

            if (!favorite) {
                res.status(404).json('Can not find favorite with id ' + favorite_id);
            } else {

                await favorite.destroy();
                res.status(200).json('OK');
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    }
};

module.exports = favoriteController
