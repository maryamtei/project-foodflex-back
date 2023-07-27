const sanitizer = require('sanitizer');

const bodySanitizer = (req, res, next) => {
    if (req.body) {
        for(let property in req.body){
            console.log('coucou');
            req.body[property] = sanitizer.escape(req.body[property]);
        }
    }
    next();
}

module.exports = bodySanitizer;