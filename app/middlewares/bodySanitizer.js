// const sanitizer = require('sanitizer');

const bodySanitizer = (req, res, next) => {
    function sanitizeObject(obj) {
        for (let property in obj) {
            if (typeof obj[property] === "object" && obj[property] !== null) {
                sanitizeObject(obj[property]); // Recursively sanitize nested objects
            } else {
                obj[property] = sanitizer.escape(obj[property]);
            }
        }
    }

    if (req.body) {
        sanitizeObject(req.body);
    }

    next();
}

// module.exports = bodySanitizer;