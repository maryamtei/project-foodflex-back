const Schedule = require('../models/schedule');
const Meal = require('../models/schedule');
const User = require('../models/schedule');

const scheduleController = {
    getSchedule: async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },

    addSchedule: async (req, res) => {
        try {
            const { userId, idDbMeal, name, imageUrl, position } = req.body;

            const user = await User.findbypk(userId, {
                include: ['favorites', { model: Schedule, as: 'schedules', include: 'meals' }]
            });

            if (!user) {
                return res.status(400).json(`Cet utilisateur n'éxiste déjà pas.`);
            }

            const addMeal = await Meal.create({
                idDbMeal,
                name,
                imageUrl,
                position
            })



            const addSchedule = await Schedule.create({
                week,

            });

            addSchedule.meals.push(addMeal)


            return res.status(200).json(addSchedule); //Pas sure qu'on return cet var
            //add redirect
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },

    modifySchedule: async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
};

module.exports = scheduleController
