const User = require('./user');
const Favorite = require('./favorite');
const Meal = require('./meal');
const Role = require('./role');
const Scheduling = require('./scheduling');

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
    as: "schedules"
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
});

Role.belongsToMany(User, {
    foreignKey: "role_id",
    as: "roles"
});

User.haveOne(Role, {
    foreignKey: "role_id",
    as: "role"
})