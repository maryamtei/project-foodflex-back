const bcrypt = require('bcrypt');
const generateAuthTokens = require('../middlewares/generateAuthTokens')

const { User, Schedule, Meal, Favorite } = require('../models/associations');

const userController = {

    modifyUser: async (req, res) => {
        try {
            const user_id = req.params.id;
            const { firstname, lastname, password, email } = req.body;

            let user = await User.findByPk(user_id);

            if (!user) {
                res.status(404).json('Can not find user with this id ' + user_id);
            } else {

                if (firstname) { user.firstname = firstname }

                if (lastname) { user.lastname = lastname }

                if (password) { user.password = password }

                //! Comment modifié le domain rfc_email
                if (email) { user.email = email }

                await user.save();

                res.status(200).json(user);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    getOneUser: async (req, res) => {
        try {
            const user_id = req.params.id;
            console.log("test")
            const user = await User.findByPk(user_id, {
                include: ['favorites', { model: Schedule, as: 'schedules', include: 'meals' }]
            })
            if (!user) {
                res.status(404).json('Can not find user with id : ' + user_id);
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user_id = req.params.id;
            const user = await User.findByPk(user_id, {
                include: ['favorites', { model: Schedule, as: 'schedules', include: 'meals' }]
            });
            const schedules = await Schedule.findAll({ where: { user_id } });
            // const meal = await Meal.findOne({ where: { schedule_id: schedule } });

            if (!user) {
                res.status(404).json('Can not find user with id ' + user_id);
            } else {
                // For each schedule, we destroy meal
                for (const schedule of schedules) {
                    await Meal.destroy({ where: { schedule_id: schedule.id } })
                }
                // Schedule destroy with user_id
                await Schedule.destroy({ where: { user_id: user_id } });
                // Favorite destroy with user_id
                await Favorite.destroy({ where: { user_id: user_id } });

                // Then user destroy with meal, schedule and favorite empty
                await user.destroy();
                res.status(200).json('OK');
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    signUp: async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;
            const user = await User.findOne({ where: { email } }); //email unique

            if (user) {
                return res.status(400).json('Cet utilisateur existe déjà.');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                firstName,
                email,
                lastName,
                password: hashedPassword,
                role_id: 2, // role_id = 2 => membre
            });

            return res.status(200).json(newUser); //Pas sure qu'on return cet var
            //add redirect
        } catch (error) {
            console.log(error);
            await t.rollback();
            res.status(500).json(error.toString())
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(email);
            console.log(password);

            const user = await User.findOne({
                where: { email },
                include: [
                  'favorites',
                  { model: Schedule, as: 'schedules', include: 'meals' },
                ],
              });


            if (!user) {
                return res.status(400).json('Identifiants invalides.');
            }


            //! --------- REVOIR LE CHIFFREMENT DU MOT DE PASSE ------------//

            const password_validor = await bcrypt.compare(password, user.password);

            if (password_validor) {
                return res.status(400).json('Identifiants invalides.');
            }

            const authToken = await generateAuthTokens(user.id) // création du token jwt
            //return res.status(200).header('Authorization', `Bearer ${authToken}`).json({ message: 'Connexion réussie.', authToken, user});
            console.log(authToken)
            return res.status(200).json({ message: 'Connexion réussie.', token:authToken.token, user:user});

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    getUserInformation: async (req, res) => {
        return res.status(200).json({ message: 'Authentification réussie.', user:req.user})
    },
    logout: async (req, res) => {
        try {
           if (!req.authToken) {
            return res.status(401).json({ message: 'Token manquant. Déconnexion échouée.' });
           }
           console.log(req.user.token)

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    }

};

module.exports = userController
