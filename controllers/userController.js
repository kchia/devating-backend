const express = require('express');
const router = express.Router();

const User = require('../db/models/userModel');

router.get('/', (req, res) => {
  User.find({}).then(users => {
    res.json(users);
  });
});
router.get('/:email', (req, res) => {
  User.find({ email: req.params.email }).then(users => {
    res.json(users);
  });
});

module.exports = router;
