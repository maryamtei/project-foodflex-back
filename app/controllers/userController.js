const bcrypt = require('bcrypt');
const { User, Schedule } = require('../models/associations');

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
    deleteProfil: async (req, res) => {
        try {
            const user_id = req.params.id;
            const user = await User.findByPk(user_id, {
                include: 'favorites' // Question, on supprime un profil donc ses favoris aussi ?
            })
            if (!user) {
                res.status(404).json('Can not find user with id ' + user_id);
            } else {
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
            const { firstname, lastname, email, password } = req.body;
            const user = await User.findOne({ where: { email } }); //email unique

            if (user) {
                return res.status(400).json('Cet utilisateur existe déjà.');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                firstname,
                email,
                lastname,
                password: hashedPassword
            });

            return res.status(200).json('Inscription reussie !', newUser); //Pas sure qu'on return cet var
            //add redirect
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } }); //email unique


            if (!user) {
                return res.status(400).json('Identifiants invalides.');
            }

            const password_validor = await bcrypt.compare(password, user.password);

            if (!password_validor) {
                return res.status(400).json('Identifiants invalides.');
            }
            return res.status(200).json('Connexion réussie.'); //Pareil pas encore reflechi a si j'add user ou pas
            //Add redirect planning

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    }

};

module.exports = userController
