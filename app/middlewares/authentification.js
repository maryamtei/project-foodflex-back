// Import required modules and models
const jwt = require('jsonwebtoken'); // JSON Web Token library
const User = require('../models/user'); // User model
const apiError = require('../errors/apiErrors'); // Custom API error module

// Authentication middleware function
const authentication = async (req, res, next) => {
    try {
        // Get the secret key for token verification from environment variables
        const secret = process.env.SECRET;

        // Extract the JWT token from the 'Authorization' header (Bearer token)
        const authTokenHeader = req.headers.authorization.split(' ')[1];

        // Verify and decode the JWT token to get the user's ID (decodedToken = idUser)
        const decodedToken = jwt.verify(authTokenHeader, secret);

        // Find the user in the database based on the decoded user ID from the token
        const user = await User.findOne({ where: { id: decodedToken._id } });

        // If the user is not found, throw a custom API error with a 401 status code
        if (!user) throw new apiError('Can not find user, please reconnect', { statusCode: 401 });

        // If the user is found, add the authentication token and user ID to the request object
        req.authToken = authTokenHeader;
        req.user = {}
        req.user.id = decodedToken._id;

        // Log authentication success and proceed to the next middleware/controller
        console.log("Authentication successful.");
        next();
    } catch (e) {
        // If an error occurs during token verification or user lookup, return a 401 status code with an error message
        return res.status(401).json({ message: "Invalid token, please reconnect" });
    }
};

// Export the authentication middleware function to be used in other modules
module.exports = authentication;
