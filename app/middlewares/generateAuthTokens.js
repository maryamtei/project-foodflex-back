const jwt = require('jsonwebtoken');
const AuthToken = require('../models/authToken');

const generateAuthTokens = async function (id) {
    const secret = process.env.SECRET;

    // Generate a JWT token with a 24-hour duration
    const authToken = jwt.sign({ _id: id.toString() }, secret, { expiresIn: '24h' });

    // Create a new AuthToken instance and store it in the database
    const newToken = await AuthToken.create({
        user_id: id,
        token: authToken
    });

    // Return the newly created token object
    return newToken;
}

module.exports = generateAuthTokens;
