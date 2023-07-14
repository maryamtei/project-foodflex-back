const Scheduling = require('../models/scheduling');

const schedulingController = {

    modifyScheduling: async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    getSchedule: async (req,res) => {
        try {

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    }
};

module.exports = schedulingController
