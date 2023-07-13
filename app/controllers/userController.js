const User = require('../models/user');

const userController = {

    modifyUser: async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    getUser: async (req,res) => {
        try {

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    deleteProfil: async (req,res) => {
        try {

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    signUp: async (req,res) => {
        try {

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    },
    login: async (req,res) => {
        try {

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString())
        }
    }

};

module.exports = userController
