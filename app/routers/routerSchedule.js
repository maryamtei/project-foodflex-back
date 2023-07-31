const express = require('express');

/*------------ Controller ---------------- */

const scheduleController = require('../controllers/scheduleController');

/*------------ Middlewares ---------------- */

const authentification = require('../middlewares/authentification');
const controllerWrapper = require('../middlewares/controllerWrapper'); // Controller Wrapper (refacto)


/*------------ Validation_Schema ---------------- */

const validator = require('../validation/validator'); // Schema validator

const validateAddScheduleSchema = require('../validation/scheduleSchemas/addScheduleSchema');
const validateDeleteScheduleSchema = require('../validation/scheduleSchemas/deleteScheduleSchema');
// const validateModifyScheduleSchema = require('../validation/scheduleSchemas/modifyScheduleSchema');

/*------------ Routes ---------------- */

const router = express.Router();
/**
 * POST /schedule-Meal
 * @summary Add a meal to schedule
 * @tags Schedule
 * @security BasicAuth
 * @param {userModify} request.body.required - ok
 * @returns {userModify} 200 - Success message and response data.
 * @returns {object} 400 - Error message and details for invalid form data.
 * @returns {object} 400 - Error message and details for connexion problem.
 * @returns {object} 422 - Error message when the request body is incomplete or invalid.
 * @returns {object} 500 - Error message and details for server errors.
 */
router.post(`/schedule-Meal`, authentification, validator('body',validateAddScheduleSchema),controllerWrapper(scheduleController.addMealSchedule));
/**
 * DELETE /schedule-delete/:id
 * @summary Delete a meal in the schedule
 * @tags Schedule
 * @security BasicAuth
 * @param {string} meal_id.query - id of the meal
 * @returns {object} 400 - Error message and details for invalid form data.
 * @returns {object} 400 - Error message and details for connexion problem.
 * @returns {object} 422 - Error message when the request body is incomplete or invalid.
 * @returns {object} 500 - Error message and details for server errors.
 */
router.delete(`/schedule-delete/:id`, authentification, validator('params',validateDeleteScheduleSchema),controllerWrapper(scheduleController.deleteSchedule));


module.exports = router;
