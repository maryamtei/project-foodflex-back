const User = require('./user');
const Favorite = require('./favorite');
const Meal = require('./meal');
const Role = require('./role');
const Schedule = require('./schedule');

// One-to-One : hasOne + belongsTo
// One-to-Many : hasMany + belongsTo
// Many-to-Many : belongsToMany (through) + belongsToMany (through)

User.hasMany(Favorite, {
    foreignKey: "user_id",
    as: "favorite"
});

Favorite.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

User.hasMany(Schedule, {
    foreignKey: "user_id",
    as: "schedule"
});

Schedule.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

Schedule.hasMany(Meal, {
    foreignKey: "scheduling_id",
    as: "meal"
});

Meal.belongsTo(Schedule, {
    foreignKey: "schedule_id",
    as: "schedule"
});

Role.hasMany(User, {
    foreignKey: "role_id",
    as: "user"
});

User.belongsTo(Role, {
    foreignKey: "role_id",
    as: "role"
})