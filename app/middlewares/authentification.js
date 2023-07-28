const jwt = require('jsonwebtoken');
const User = require('../models/user');
const apiError = require('../errors/apiErrors');

const authentification =  async(req, res, next) => {
    try {
        const authTokenHeader = req.headers.authorization.split(' ')[1] // récupere le token stocker dans le header
        const decodedToken =jwt.verify(authTokenHeader,'secret') // decodedToken = idUser
        const user = await User.findOne({
          where: { id: decodedToken._id }});

        if (!user) throw new apiError('Can not find user, please reconnect ', { statusCode: 401 });

        req.authToken = authTokenHeader;
        req.user =  {}
        req.user.id = decodedToken._id;
        console.log("authentification ok")
        next()
    }catch(e){
      throw new apiError('Authentication problem', { statusCode: 401 });
    }
}
module.exports = authentification