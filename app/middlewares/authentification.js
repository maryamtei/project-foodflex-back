const jwt = require('jsonwebtoken');
const User = require('../models/user');


const authentification =  async(req, res, next) => {
    try {
        const authTokenHeader = req.header('Authorization').replace('Bearer','');
        const decodedToken = jwt.verify(authTokenHeader, 'secret')
        const user = await User.findOne({
            where: { id: decodedToken._id },
            include: {
              model: AuthToken,
              where: { token: authTokenHeader }
            }
          });

        if (!user) throw new Error();
        req.user = user;
        next()
    }catch(e){
        res.status(401).send("Utilisateur non connecté")
    }
}
module.exports = authentification