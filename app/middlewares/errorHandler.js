const ApiError = require('../errors/apiErrors');

/**
 * Middleware that respond to a next method with an error as argument
 * @param {object} err Error class
 * @param {object} res Express response object
 */

const errorHandler = (error, req, res, next) => {
    console.error('Error Server Side : ', error);
    let { message } = error;
    let statusCode = error.infos?.statusCode;
    if (!statusCode || Number.isNaN(Number(statusCode))) {
        statusCode = 500;
    }
    // Si c'est une erreur serveur (statusCode 500) et que l'application n'est pas en mode de développement,
    // remplacer le message d'erreur par un message générique pour ne pas divulguer d'informations sensibles
    //if (statusCode === 500 && res.app.get('env') !== 'development') {
    //    message = 'Internal Server Error';
    //}
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
}

module.exports = {
    ApiError,
    errorHandler,
};
