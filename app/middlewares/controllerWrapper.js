/**
 * Controller wrapper to manage errors
 * @param {object} controller a controller to execute iside a try… catch… block
 * @returns a controller as middleware function
 */
const controllerWrapper = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (error) {
        next(error); // C'est ici qu'on sera rediriger vers le middleware errorHandler ( celui qui gère les erreurs )
    }
};
module.exports = controllerWrapper
