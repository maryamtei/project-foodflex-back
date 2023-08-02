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
 * @param {addMeal} request.body.required - Please provide the required information as specified in the following schema.
 * @returns {userInfo} 200 - Success message and response data.
 * @returns {errorSchema} 400 - Error message and details for invalid form data.
 * @returns {errorData} 404 - Schedule don't exist.
 * @returns {errorData} 422 - Fields of meal are not complete
 * @returns {errorData} 500 - Error message and details for server errors.
 */
router.post(`/schedule-Meal`, authentification, validator('body',validateAddScheduleSchema),controllerWrapper(scheduleController.addMealSchedule));
/**
 * DELETE /schedule-delete/:id
 * @summary Delete a meal in the schedule
 * @tags Schedule
 * @security BasicAuth
 * @param {number} meal_id.query - Id of the meal
 * @returns {errorSchema} 400 - Error message and details for invalid form data.
 * @returns {errorData} 404 - Can not find meal with id.
 * @returns {errorData} 500 - Error message and details for server errors.
 */
router.delete(`/schedule-delete/:id`, authentification,controllerWrapper(scheduleController.deleteSchedule));


module.exports = router;
