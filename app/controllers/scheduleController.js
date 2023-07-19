const { Meal, Schedule, User } = require('../models/associations');
const { associations } = require('../models/user');

const scheduleController = {
    addSchedule: async (req, res) => {
        try {
            const { user_id, schedule_id, week, meals } = req.body;


            const user = await User.findByPk(user_id, {
                include: ['favorites', { model: Schedule, as: 'schedules', include: 'meals' }]
            });
            // ----- Search Schedule with Id User et Week number
            const schedule = await Schedule.findOne({ where: { user_id, week: week } });


            if (!user) {
                return res.status(400).json(`Cet utilisateur n'éxiste déjà pas.`);
            }

            // ---- if schedule not exist, we create it with meal

            if (!schedule) {
                const addSchedule = await Schedule.create({
                    user_id: user_id,
                    week: week,
                });

                const addMeal = await Meal.create({
                    idDbMeal: meals.idDbMeal,
                    schedule_id: addSchedule.id,
                    name: meals.name,
                    image: meals.imageUrl,
                    position: meals.position,
                })
                user.schedules.push(addMeal)
            } else {
                // ----- Check if position already exist on the meal 
                const mealFind = await Meal.findOne({ where: { schedule_id: schedule.id, position: meals.position } });

                // ---- if meal not exist, we create meal else we replace
                if (!mealFind) {
                    const addMeal = await Meal.create({
                        idDbMeal: meals.idDbMeal,
                        schedule_id: schedule.id,
                        name: meals.name,
                        image: meals.imageUrl,
                        position: meals.position,
                    })
                    user.schedules.push(addMeal)
                } else {
                    // We replace the existing meal
                    mealFind.idDbMeal = meals.idDbMeal;
                    mealFind.name = meals.name;
                    mealFind.image = meals.imageUrl;
                    mealFind.position = meals.position;

                    mealFind.save()
                }
            }

            return res.status(200).json('ok');
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    deleteSchedule: async (req, res) => {
        try {
            const meal_id = req.params.id;

            const meal = await Meal.findByPk(meal_id);

            if (!meal) {
                res.status(404).json('Can not find meal with id ' + meal_id);
            } else {

                await Meal.destroy({ where: { id: meal_id } })

                res.status(200).json('Meal_id has been removed');
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
};

module.exports = scheduleController
