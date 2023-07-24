const User = require('../models/user');
const { Schedule, Favorite, Meal } = require('../models/associations');

const newUserData = async function (id){
   return await User.findOne({
    where: { id: id },
    attributes: ['firstName', 'lastName', 'email'],
    include: [
      {model: Favorite, as: 'favorites',attributes: ['id', 'idDbMeal', 'name',"image", "position"] },
      { model: Schedule, as: 'schedules' ,attributes: ['id', 'week'],
      include: [ {model: Meal, as: 'meals',attributes: ['id', 'idDbMeal', 'name',"image", "position"] }] },
    ],
  })

  ;}

module.exports = newUserData