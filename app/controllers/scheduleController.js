const Schedule = require('../models/schedule');

const scheduleController = {

    modifySchedule: async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    getSchedule: async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    }
};

module.exports = scheduleController
