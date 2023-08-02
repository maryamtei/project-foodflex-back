// Import the 'sanitizer' module
const sanitizer = require('sanitizer');

// Body sanitizer middleware function
const bodySanitizer = (req, res, next) => {
    // Function to recursively sanitize an object's properties
    function sanitizeObject(obj) {
        for (let property in obj) {
            // Check if the property is an object and not null
            if (typeof obj[property] === "object" && obj[property] !== null) {
                sanitizeObject(obj[property]); // Recursively sanitize nested objects
            } else {
                // Sanitize the property value using the 'sanitizer.escape()' function
                obj[property] = sanitizer.escape(obj[property]);
            }
        }
    }

    // Check if the request body exists
    if (req.body) {
        // Sanitize the request body object
        sanitizeObject(req.body);
    }

    // Move to the next middleware/controller
    next();
}

// Export the body sanitizer middleware function to be used in other modules
module.exports = bodySanitizer;
