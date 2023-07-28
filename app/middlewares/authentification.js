const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { AuthToken, Schedule } = require('../models/associations');


const authentification =  async(req, res, next) => {
    try {
        const authTokenHeader = req.headers.authorization.split(' ')[1] // récupere le token stocker dans le header
        const decodedToken =jwt.verify(authTokenHeader,'secret') // decodedToken = idUser
        const user = await User.findOne({
          where: { id: decodedToken._id }});

        if (!user) throw new Error();

        req.authToken = authTokenHeader;
        req.user =  {}
        req.user.id = decodedToken._id;
        console.log("authentification ok")
        next()
    }catch(e){
      console.log(e)
        res.status(401).send("Probleme de connexion")
    }
}
module.exports = authentification