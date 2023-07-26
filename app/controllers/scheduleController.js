const sequelize = require("../dbConnexion");
const { Meal, Schedule, User } = require('../models/associations');
const newUserData = require('../middlewares/userData');
const apiError = require('../errors/apiErrors');

const scheduleController = {
  addMealSchedule: async (req, res) => {
    const user_id = req.user.id;
    const { meals, week } = req.body;
    const schedule = await Schedule.findOne({ where: { user_id, week: week } });

    if (!meals.idDbMeal || !meals.name || !meals.image || meals.position == undefined) {
      throw new apiError(`Fields of meal are not complete`, { statusCode: 400 });
    }

    if (!schedule) {
      throw new apiError(`Schedule don't exist.`, { statusCode: 400 });
    }

    const mealFind = await Meal.findOne({ where: { schedule_id: schedule.id, position: meals.position } });
    if (mealFind) {
      mealFind.idDbMeal = meals.idDbMeal;
      mealFind.name = meals.name;
      mealFind.image = meals.image;
      mealFind.position = meals.position;
      await mealFind.save()
    } else {
      await Meal.create({
        idDbMeal: meals.idDbMeal,
        schedule_id: schedule.id,
        name: meals.name,
        image: meals.image,
        position: meals.position,
      })
    }
    const newUser = await newUserData(user_id);
    const response = {
      message: 'Meal add to schedule',
      newUser
    }
    res.status(200).json(response);
  },

  deleteSchedule: async (req, res) => {
    const user_id = req.user.id;
    const meal_id = req.params.id;
    const meal = await Meal.findByPk(meal_id);

    if (!meal) {
      throw new apiError('Can not find meal with id ' + meal_id, { statusCode: 404 });
    }
    await Meal.destroy({ where: { id: meal_id } })
    const newUser = await newUserData(user_id);
    const response = {
      message: 'Meal delete to schedule',
      newUser
    }
    res.status(200).json(response);
  }


};

module.exports = scheduleController;
