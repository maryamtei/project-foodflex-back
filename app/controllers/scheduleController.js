const sequelize = require("../dbConnexion");
const { Meal, Schedule, User } = require('../models/associations');
const newUserData = require('../middlewares/userData');
const apiError = require('../errors/apiErrors');

const scheduleController = {
  /**
   * Add a meal to the user's schedule.
   * @async
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {apiError} Error thrown if meal fields are incomplete or if the schedule does not exist.
   * @returns {Object} JSON response containing a success message and the updated user data.
   */
    /**
    * @typedef {object} schedule
    * @property {number} id
    * @property {number} week
    * @property {[]} meals
    */
    /**
    * @typedef {object} meals
    * @property {string} idDbMeal
    * @property {string} name
    * @property {string} image
    * @property {number} position
    */
    /**
    * @typedef {object} addMeal
    * @property {meals} meals
    * @property {number} week
    */
  addMealSchedule: async (req, res) => {

    // Get the user ID from the request
    const user_id = req.user.id;
    const { meals, week } = req.body;
    // Find the schedule for the specified user and week
    const schedule = await Schedule.findOne({ where: { user_id, week: week } });

    // Check if the meal fields are complete
    if (!meals.idDbMeal  || !meals.name  || !meals.image  || meals.position == undefined  ) {
        throw new apiError(`Fields of meal are not complete`, { statusCode: 422 });
    }

    // Check if the schedule exists
    if (!schedule) {
        throw new apiError(`Schedule don't exist.`, { statusCode: 404 });
    }

    // Find a meal in the schedule with the specified position
    const mealFind = await Meal.findOne({ where: { schedule_id: schedule.id, position: meals.position } });
    if (mealFind) {

      // Update the existing meal if found
      mealFind.idDbMeal = meals.idDbMeal;
      mealFind.name = meals.name;
      mealFind.image = meals.image;
      mealFind.position = meals.position;

      await mealFind.save()
    } else {
      await Meal.create({
        // Create a new meal if not found
        idDbMeal: meals.idDbMeal,
        schedule_id: schedule.id,
        name: meals.name,
        image: meals.image,
        position: meals.position,
      })
    }

    // Get updated user data after adding the meal to the schedule
    const newUser = await newUserData(user_id);
    const response =  {
        message: 'Meal add to schedule',
        newUser
    }
    res.status(200).json(response);
  },

  /**
   * Delete a meal from the user's schedule.
   * @async
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {apiError} Error thrown if the meal with the specified ID is not found.
   * @returns {Object} JSON response containing a success message and the updated user data.
   */
  deleteSchedule: async (req, res) => {

    // Get the user ID from the request
    const user_id = req.user.id;
    const meal_id = req.params.id;
    // Find the meal with the specified ID
    const meal = await Meal.findByPk(meal_id);

    // Check if the meal exists
    if (!meal) {
        throw new apiError('Can not find meal with id ' + meal_id, { statusCode: 404 });
    }

    // Delete the meal
    await Meal.destroy({ where: { id: meal_id } })

    // Get updated user data after deleting the meal from the schedule
    const newUser = await newUserData(user_id);
    const response =  {
        message: 'Meal delete to schedule',
        newUser
    }
    res.status(200).json(response);
  }


};

module.exports = scheduleController;
