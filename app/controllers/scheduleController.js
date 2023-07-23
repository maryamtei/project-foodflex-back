const sequelize = require("../dbConnexion");
const { Meal, Schedule, User } = require('../models/associations');
const newUserData = require('../middlewares/userData');

const scheduleController = {
        addMealSchedule: async (req, res) => {

        const t = await sequelize.transaction();
        const user_id = req.user.id;
        try {
            const {meals, week } = req.body;

            // ----- Search Schedule with Id User et Week number
            const schedule = await Schedule.findOne({ where: { user_id, week: week } });

            if (!meals.idDbMeal  || !meals.name  || !meals.image  || !meals.position  ) {
                const error = {
                    codeMessage: 6,
                    message: 'Fields of meal are not complete'
                }
                return res.status(400).json(error);
            }
            if (!schedule) {
                const error = {
                    codeMessage: 7,
                    message: `Schedule don't exist.`
                }
                return res.status(400).json(error);
            }

            // ----- Check if position already exist on the meal
            const mealFind = await Meal.findOne({ where: { schedule_id: schedule.id, position: meals.position } });
            if (mealFind) {
                mealFind.idDbMeal = meals.idDbMeal;
                mealFind.name = meals.name;
                mealFind.image = meals.image;
                mealFind.position = meals.position;

                mealFind.save()
            } else {
                await Meal.create({
                    idDbMeal: meals.idDbMeal,
                    schedule_id: schedule.id,
                    name: meals.name,
                    image: meals.image,
                    position: meals.position,
                })
            }
             await t.commit();
            const newUser = await newUserData(user_id);
            const response =  {
                codeMessage:102,
                message: 'Meal add to schedule',
                newUser
            }
            res.status(200).json(response);
        } catch (error) {
            console.log(error);

            await t.rollback();

            res.status(500).json(error.toString())
        }
    },
    deleteSchedule: async (req, res) => {
        try {
            const user_id = req.user.id;
            const meal_id = req.params.id;
            const meal = await Meal.findByPk(meal_id);

            if (!meal) {
                const error = {
                    codeMessage: 9,
                    message: `Can not find meal with id` + meal_id
                }
                return res.status(404).json(error);
            } else {

                await Meal.destroy({ where: { id: meal_id } })

                const newUser = await newUserData(user_id);
                const response =  {
                    codeMessage:103,
                    message: 'Meal delete to schedule',
                    newUser
                }
                res.status(200).json(response);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
};

module.exports = scheduleController
