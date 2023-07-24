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

router.post(`/schedule-Meal`, authentification, validator('body',validateAddScheduleSchema),controllerWrapper(scheduleController.addMealSchedule));
router.delete(`/schedule-delete/:id`, authentification, validator('params',validateDeleteScheduleSchema),controllerWrapper(scheduleController.deleteSchedule));
// router.patch(`/planning/:id`, scheduleController.modifyScheduling)
// router.patch(`/schedule/:id`,validator('body',validateModifyScheduleSchema),scheduleController.modifySchedule);

module.exports = router;
