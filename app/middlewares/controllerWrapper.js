const controllerWrapper = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (error) {
        next(error); // C'est ici qu'on sera rediriger vers le middleware errorHandler ( celui qui gère les erreurs )
    }
};
module.exports = controllerWrapper
