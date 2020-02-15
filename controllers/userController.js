const express = require('express');
const router = express.Router();

const User = require('../db/models/userModel');

router.post('/signup', (req, res) => {
    User.create(req.body).then(users => {
        res.json(users);
    });
});

module.exports = router;