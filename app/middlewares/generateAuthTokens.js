const jwt = require('jsonwebtoken');

const generateAuthTokens =  async function (id){
    const authToken = jwt.sign({_id: id.tostring()},'test')

}
module.exports = generateAuthTokens