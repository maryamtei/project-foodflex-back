const User = require('./user');
const Favorite = require('./favorite');
const Meal = require('./meal');
const Role = require('./role');
const Schedule = require('./schedule');
const AuthToken = require('./authToken');

// One-to-One : hasOne + belongsTo
// One-to-Many : hasMany + belongsTo
// Many-to-Many : belongsToMany (through) + belongsToMany (through)

User.hasMany(Favorite, {
    foreignKey: "user_id",
    as: "favorites"
});

Favorite.belongsTo(User, {
    foreignKey: "user_id",
    as: "users"
});

User.hasMany(Schedule, {
    foreignKey: "user_id",
    as: "schedules"
});

Schedule.belongsTo(User, {
    foreignKey: "user_id",
    as: "users"
});

Schedule.hasMany(Meal, {
    foreignKey: "schedule_id",
    as: "meals"
});

Meal.belongsTo(Schedule, {
    foreignKey: "schedule_id",
    as: "schedules"
});

Role.hasMany(User, {
    foreignKey: "role_id",
    as: "users"
});

User.belongsTo(Role, {
    foreignKey: "role_id",
    as: "roles"
});

AuthToken.hasOne(User, {
    foreignKey: "user_id",
    as: "user_authToken"
});

User.belongsTo(AuthToken, {
    foreignKey: "user_id",
    as: "AuthToken"
});

module.exports = { User, Favorite, Meal, Role, Schedule, AuthToken }