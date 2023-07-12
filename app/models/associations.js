const User = require('./user');
const Favorite = require('./favorite');
const Meal = require('./meal');
const Role = require('./role');
const Scheduling = require('./scheduling');

/* Associations */

//cf: https://sequelize.org/docs/v6/core-concepts/assocs/

// One-to-One : hasOne + belongsTo
// One-to-Many : hasMany + belongsTo
// Many-to-Many : belongsToMany (through) + belongsToMany (through)

// L'Utilisateur à 0 ou plusieurs favorisss

User.hasMany(Favorite, {
    foreignKey: "user_id",
    as: "favorites"
});

Favorite.belongsTo(User, {
    foreignKey: "user_id",
    as: "favorite"
});

User.hasMany(Scheduling, {
    foreignKey: "user_id",
    as: "Schedules"
});

Scheduling.belongsTo(User, {
    foreignKey: "user_id",
    as: "schedule"
});

Scheduling.haveMany(Meal, {
    foreignKey: "scheduling_id",
    as: "mealsOnSchedule"
});

Meal.belongsToMany(Scheduling, {
    foreignKey: "scheduling_id",
    as: "mealsForSchedule"
})

module.exports = { List, Card, Tag }