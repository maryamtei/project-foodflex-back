const bcrypt = require('bcrypt');
const generateAuthTokens = require('../middlewares/generateAuthTokens')
const newUserData = require('../middlewares/userData');
const { User, Schedule, Meal, Favorite, AuthToken } = require('../models/associations');
const apiError = require('../errors/apiErrors');

const userController = {
  modifyUser: async (req, res) => {
    const user_id = req.params.id;
    const { firstname, lastname, password, email } = req.body;
    let user = await User.findByPk(user_id);

    if (!user) {
      // res.status(404).json('Can not find user with this id ' + user_id);
      throw new apiError('Can not find user with this id ' + user_id, { statusCode: 404 });
    } else {
      if (firstname) { user.firstName = firstname }
      if (lastname) { user.lastName = lastname }
      if (password) { user.password = password }
      if (email) { user.email = email }
      await user.save();
      res.status(200).json(user);
      // throw new apiError(user, { statusCode: 200 });
    }
  },

  getOneUser: async (req, res) => {
    const user_id = req.params.id;
    console.log("test")
    const user = await User.findByPk(user_id, {
      include: ['favorites', { model: Schedule, as: 'schedules', include: 'meals' }]
    })

    if (!user) {
      // res.status(404).json('Can not find user with id : ' + user_id);
      throw new apiError('Can not find user with id : ' + user_id, { statusCode: 404 });
    } else {
      res.status(200).json(user);
      // throw new apiError(user, { statusCode: 200 });
    }
  },

  deleteUser: async (req, res) => {
    const user_id = req.params.id;
    const user = await User.findByPk(user_id, {
      include: ['favorites', { model: Schedule, as: 'schedules', include: 'meals' }]
    });
    const schedules = await Schedule.findAll({ where: { user_id } });

    if (!user) {
      // res.status(404).json('Can not find user with id ' + user_id);
      throw new apiError('Can not find user with id ' + user_id, { statusCode: 404 });
    } else {
      for (const schedule of schedules) {
        await Meal.destroy({ where: { schedule_id: schedule.id } })
      }
      await Schedule.destroy({ where: { user_id: user_id } });
      await Favorite.destroy({ where: { user_id: user_id } });
      await user.destroy();
      res.status(200).json('OK');
      // throw new apiError('OK', { statusCode: 200 });
    }
  },

  signUp: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      // res.status(400).json('Cet utilisateur existe déjà.');
      throw new apiError('Cet utilisateur existe déjà.', { statusCode: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      email,
      lastName,
      password: hashedPassword,
      role_id: 2, // role_id = 2 => membre
    });

    if (newUser) {
      for (let week = 1; week <= 52; week++) {
        await Schedule.create({
          user_id: newUser.id,
          week: week,
          meals: []
        });
      }
    }

    const newUserSignUp = await newUserData(newUser.id);
    console.log(newUserSignUp);
    res.status(200).json(newUserSignUp);
    // throw new apiError(newUserSignUp, { statusCode: 200 });
    //add redirect
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      // res.status(400).json('Identifiants invalides.');
      throw new apiError('Identifiants invalides.', { statusCode: 400 });
    }

    const password_validor = await bcrypt.compare(password, user.password);
    console.log(password_validor)
    if (!password_validor) {
      // res.status(400).json('Identifiants invalides.');
      console.log(password)
      console.log(email)
      throw new apiError('Identifiants invalides.', { statusCode: 400 });
    }

    const authToken = await generateAuthTokens(user.id)
    const newUser = await newUserData(user.id);
    res.status(200).json({ message: 'Connexion réussie.', token: authToken.token, user: newUser });
    // throw new apiError({ message: 'Connexion réussie.', token: authToken.token, user: newUser }, { statusCode: 200 });
  },

  getUserInformation: async (req, res) => {
    const user_id = req.user.id;
    const newUser = await newUserData(user_id);
    res.status(200).json({ message: 'Authentification réussie.', user: newUser });
    // throw new apiError({ message: 'Authentification réussie.', user: newUser }, { statusCode: 200 });
  },

  logout: async (req, res) => {
    const user_id = req.user.id;

    if (!req.authToken) {
      // res.status(401).json({ message: 'Token manquant. Déconnexion échouée.' });
      throw new apiError({ message: 'Token manquant. Déconnexion échouée.' })
    }
  }
};

module.exports = userController;
