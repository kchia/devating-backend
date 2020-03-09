const express = require('express');
const router = express.Router();

const User = require('../db/models/userModel');

// create new user
router.post('/signup', (req, res) => {
  User.create(req.body).then(users => {
    res.json(users);
  });
});

// remove unused code below
// update user information
// router.put('/:id/edit', (req, res) => {
//   User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
//     new: true
//   }).then(user => res.json(user));
// });

router.put('/:email/:name', (req, res) => {
  User.findOneAndUpdate(
    { email: req.params.email },
    { name: req.params.name },
    { new: true }
  ).then(user => res.json(user));
});

// delete user
router.delete('/:email', (req, res) => {
  User.findOneAndDelete({ email: req.params.email }).then(user =>
    res.json(user)
  );
});

// sign in
router.get('/signin/:email/:password', (req, res) => {
  User.find({ email: req.params.email, password: req.params.password })
    .then(user => {
      if (user) {
        res.json(user);
      }
    })
    .catch(function(err) {
      res.json(err);
    });
});

module.exports = router;
