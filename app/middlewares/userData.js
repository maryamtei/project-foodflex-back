const User = require('../models/user');
const { Schedule, Favorite, Meal } = require('../models/associations');

const newUserData = async function (id){
  return await User.findOne({
    where: { id: id },
    attributes: ['firstName', 'lastName', 'email'],
    include: [
      {
        model: Favorite,
        as: 'favorites',
        attributes: ['id', 'idDbMeal', 'name', 'image', 'position', 'created_at'],
        separate: true,
        order: [['created_at', 'DESC']], // Sort by 'created_at' in descending order
      },
      {
        model: Schedule,
        as: 'schedules',
        attributes: ['id', 'week'],
        include: [
          {
            model: Meal,
            as: 'meals',
            attributes: ['id', 'idDbMeal', 'name', 'image', 'position'],
          },
        ],
        separate: true,
        order: [['id', 'ASC']], // Sort by 'week' in ascending order
      },
    ],
  });

  ;}

module.exports = newUserData