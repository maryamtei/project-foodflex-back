const ApiError = require('../errors/apiError');

const errorHandler = (err, req, res, next) => {
    let { message } = err;
    let statusCode = err.infos?.statusCode;

    // Par défaut le statusCode est 500
    if (!statusCode || Number.isNaN(Number(statusCode))) {
        statusCode = 500;
    }
    // Si l'application n'est pas en développement on reste vague sur l'erreur serveur envers l'utilisateur de l'API
    if (statusCode === 500 && res.app.get('env') !== 'development') {
        message = 'Internal Server Error';
    }
    if (res.get('Content-type')?.includes('html')) {
        res.status(statusCode).render('error', {
            statusCode,
            message,
            title: `Error ${err.statusCode}`,
        });
    } else {
        res.status(statusCode).json({
            status: 'error',
            statusCode,
            message,
        });
    }
};

module.exports = {
    ApiError,
    errorHandler,
};