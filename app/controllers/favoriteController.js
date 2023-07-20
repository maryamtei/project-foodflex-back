const { where } = require('sequelize');
const Favorite = require('../models/favorite');
const User = require('../models/user');
const { Schedule } = require('../models/associations');
const newUserData = require('../middlewares/userData');

const favoriteController = {
    addFavorite: async (req,res) => {
        try {
            const user_id = req.user.id;

            const user = await User.findOne({
                where: {id: user_id}
            });

            if (!user) {
                return res.status(404).json('Utilisateur introuvable');
            }

            const {idDbMeal, name, image} = req.body; //idDbMeal envoyé par le front

            const existingFavorite = await Favorite.findOne({
                where: {
                    user_id,
                    idDbMeal
                  }
            })

            if(existingFavorite){
                return res.status(400).json('Ce favori existe déjà !');
            }
            if (!image  || !name || !idDbMeal) {
                const bodyErrors = [];
                if (!image) { bodyErrors.push('image cannot be empty!'); }
                if (!name) { bodyErrors.push('name cannot be empty!'); }
                if (!idDbMeal) { bodyErrors.push('idDbMeal cannot be empty!'); }

            return res.status(422).json(bodyErrors);
            }else {
                await Favorite.create({
                    user_id,
                    image,
                    position:1,
                    name,
                    idDbMeal
                })

                const newUser = await newUserData(user_id);
                console.log("ajout dans la bdd")
                res.status(200).json({status:"ok",user:newUser});
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



            const user = await User.findOne({
                where: {id: user_id},
                include: 'favorites'
            });

            // if (!user) {
            //     return res.status(404).json('Utilisateur introuvable');
            // }

            const favorite = await Favorite.findByPk(meal_id)
            console.log(favorite)
            if (!favorite) {
                res.status(404).json('Can not find favorite with id ' + meal_id);
            } else {
                await favorite.destroy();

                const newUser = await newUserData(user_id);
                console.log("suppresion dans la bdd")
                res.status(200).json({status:"ok",user:newUser});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    }
};

module.exports = favoriteController
