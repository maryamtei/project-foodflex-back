const bcrypt = require('bcrypt');
const generateAuthTokens = require('../middlewares/generateAuthTokens')
const newUserData = require('../middlewares/userData');

const { User, Schedule, Meal, Favorite, AuthToken } = require('../models/associations');

const userController = {

    modifyUser: async (req, res) => {
        try {
            const user_id = req.params.id;
            const { firstname, lastname, password, email } = req.body;

            let user = await User.findByPk(user_id);


            if (firstname) { user.firstname = firstname }

            if (lastname) { user.lastname = lastname }

            if (password) { user.password = password }

            if (email) { user.email = email }

            await user.save();
            const response =  {
                codeMessage:104,
                message: 'Profile has been modified',
                newUser
            }
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    getOneUser: async (req, res) => {
        try {
            const user_id = req.user.id;

            const response =  {
                codeMessage:105,
                message: 'User data got',
                newUser:req.user
            }
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user_id = req.user.id;
            const user = await User.findByPk(user_id, {
                include: ['favorites', { model: Schedule, as: 'schedules', include: 'meals' }]
            });
            const schedules = await Schedule.findAll({ where: { user_id } });
            // const meal = await Meal.findOne({ where: { schedule_id: schedule } });

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

           const response =  {
            codeMessage:106,
            message: 'User delete'
        }
        res.status(200).json(response);

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
                const response =  {
                    codeMessage:14,
                    message: 'User already exists',

                }
                return res.status(400).json(response);
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                firstName,
                email,
                lastName,
                password: hashedPassword,
                role_id: 2, // role_id = 2 => membre
            });

            if(newUser){
                for (let week = 1; week <= 52; week++) {
                    await Schedule.create({
                        user_id: newUser.id,
                        week:week,
                        meals:[]
                    });
                }

            }

            const newUserSignUp = await newUserData(newUser.id);
            const authToken = await generateAuthTokens(newUser.id) // création du token jwt
            const response =  {
                codeMessage:107,
                message: 'User has been create',
                token:authToken.token,
                newUser:newUserSignUp
            }
            res.status(200).json(response);
            //add redirect
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({
                where: { email },
              });


            if (!user) {
                const response =  {
                    codeMessage:16,
                    message: 'Credentials are invalid',
                }
                return res.status(400).json(response);
            }

            const password_validor = await bcrypt.compare(password, user.password);

            if (!password_validor) {
                const response =  {
                    codeMessage:16,
                    message: 'Credentials are invalid',
                }
                return res.status(400).json(response);
            }

            const authToken = await generateAuthTokens(user.id) // création du token jwt
            const newUser = await newUserData(user.id);
            const response =  {
                codeMessage:108,
                message: 'You have been logged in',
                token:authToken.token,
                newUser
            }
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    getUserInformation: async (req, res) => {
        const user_id = req.user.id;
        const newUser = await newUserData(user_id);
        const response =  {
            codeMessage:108,
            message: 'You have been logged in',
            newUser
        }
        res.status(200).json(response);
    },
    logout: async (req, res) => {
        try {
            const user_id = req.user.id;

           if (!req.authToken) {
            const response =  {
                codeMessage:18,
                message: 'Token missing. Logout failed.',
            }
            return res.status(400).json(response);
           }else{

           }
           const tokens = await AuthToken.findAll({
            where: { user_id },
          });
          for (const token of tokens) {
            await token.destroy();
          }

           req.authToken = null;
           req.user = [];
           const response =  {
            codeMessage:109,
            message: 'Logout succesfull',
        }
        res.status(200).json(response);

        } catch (error) {

            res.status(500).json({message:error.toString()})
        }
    }

};

module.exports = userController
