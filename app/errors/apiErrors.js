/**
 * @class
 * @extends Error
 * @param {string} message - The error message.
 * @param {Object} infos - Additional information related to the error.
 * @property {string} name - The name of the error (always set to 'ApiError').
 * @property {Object} infos - Additional information related to the error.
 */

const apiError = class ApiError extends Error {
    constructor(message, infos) {
        super(message);
        this.name = 'ApiError';
        console.log('API ERROR');
        this.infos = infos;
    }
};
module.exports = apiError

