const User = require('../db/models/userModel');
const seedData = require('./seed.json');

User.remove({})
    .then(() => {
        return User.collection.insert(seedData);
    })
    .then(() => {
        process.exit();
    });