const User = require('../models/user');
const { Schedule } = require('../models/associations');

const newUserData = async function (id){
   return await User.findOne({
    where: { id: id },
    attributes: ['firstName', 'lastName', 'email'],
    include: [
      'favorites',
      { model: Schedule, as: 'schedules', include: 'meals' },
    ],
  })

  ;}

module.exports = newUserData