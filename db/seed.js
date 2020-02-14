const User = require('../db/models/userModel');
const seedData = require('./seed.json');
// const userData = require('./userSeed.json');

User.remove({})
    .then(() => {
        return User.collection.insert(seedData);
    })
    .then(() => {
        process.exit();
    });