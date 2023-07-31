// Import required modules and associations
const User = require('../models/user'); // User model
const { Schedule, Favorite, Meal } = require('../models/associations'); // Association models

// Function to fetch new user data including favorites and schedules with associated meals
const newUserData = async function (id) {
  // Fetch user data with specific attributes and associated models
  return await User.findOne({
    where: { id: id }, // Filter by user ID
    attributes: ['firstName', 'lastName', 'email'], // Include specific attributes from the User model
    include: [
      {
        model: Favorite, // Include the Favorite model as an associated model
        as: 'favorites', // Set the alias to 'favorites' for better readability
        attributes: ['id', 'idDbMeal', 'name', 'image', 'position', 'created_at'], // Include specific attributes from the Favorite model
        separate: true, // Use separate queries to load associated models, which can be more efficient
        order: [['created_at', 'DESC']], // Sort the favorites by 'created_at' in descending order
      },
      {
        model: Schedule, // Include the Schedule model as an associated model
        as: 'schedules', // Set the alias to 'schedules' for better readability
        attributes: ['id', 'week'], // Include specific attributes from the Schedule model
        include: [
          {
            model: Meal, // Include the Meal model as an associated model within Schedule
            as: 'meals', // Set the alias to 'meals' for better readability
            attributes: ['id', 'idDbMeal', 'name', 'image', 'position'], // Include specific attributes from the Meal model
          },
        ],
        separate: true, // Use separate queries to load associated models, which can be more efficient
        order: [['id', 'ASC']], // Sort the schedules by 'week' in ascending order
      },
    ],
  });
};

// Export the newUserData function to be used in other modules
module.exports = newUserData;
