const express = require('express');
const router = express.Router();

const User = require('../db/models/userModel');

// create new user
router.post('/signup', (req, res) => {
  User.create(req.body).then(users => {
    res.json(users);
  });
});

// update user information
router.put('/:id/edit', (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  }).then(user => res.json(user));
});

// delete user
router.delete('/:id/delete', (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id }).then(user => res.json(user));
});

// sign in
router.get('/signin/:email/:password', (req, res) => {
  User.find({ email: req.params.email, password: req.params.password })
    .then(user => {
      if(user){
      res.json(user);
      }
    })
    .catch(function(err) {
      res.json(err);
    });
});

module.exports = router;
