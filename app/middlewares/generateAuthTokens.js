const jwt = require('jsonwebtoken');
const AuthToken  = require('../models/authToken');

const generateAuthTokens =  async function (id){
    const secret = process.env.SECRET;
    const authToken = jwt.sign({_id: id.toString()},secret)
    return newToken = await AuthToken.create({
        user_id:id,
        token:authToken
    });

}
module.exports = generateAuthTokens