const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { AuthToken } = require('../models/associations');

const authentification =  async(req, res, next) => {
    try {
        const authTokenHeader = req.headers.authorization.split(' ')[1] // récupere le token stocker dans le header
        const decodedToken =jwt.verify(authTokenHeader,'secret')
        const user = await User.findOne({
            where: { id: decodedToken._id },
            include: {
              model: AuthToken,
              as: 'token',
              where: { token: authTokenHeader }
            }
          });


        if (!user) throw new Error();
        req.user = user;
        console.log(user)
        next()
    }catch(e){
      console.log(e)
        res.status(401).send("Utilisateur non connecté")
    }
}
module.exports = authentification