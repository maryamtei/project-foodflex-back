const User = require('./user');
const Favorite = require('./favorite');
const Meal = require('./meal');
const Role = require('./role');
const Scheduling = require('./scheduling');

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

User.hasMany(Scheduling, {
    foreignKey: "user_id",
    as: "scheduling"
});

Scheduling.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

Scheduling.hasMany(Meal, {
    foreignKey: "scheduling_id",
    as: "meal"
});

Meal.belongsTo(Scheduling, {
    foreignKey: "scheduling_id",
    as: "scheduling"
});

Role.hasMany(User, {
    foreignKey: "role_id",
    as: "user"
});

User.belongsTo(Role, {
    foreignKey: "role_id",
    as: "role"
})