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

            // ----- Check if position already exist on the meal 
            const mealFind = await Meal.findOne({ where: { schedule_id: schedule.id, position: meals.position } });

            if (!user) {
                return res.status(400).json(`Cet utilisateur n'éxiste déjà pas.`);
            }
            console.log(mealFind)

            // ---- if schedule not exist, we create it with meal

            if (!user.schedules) {
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

};

module.exports = scheduleController
