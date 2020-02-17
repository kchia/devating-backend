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
router.get('/signin', (req, res) => {
  User.find({ email: req.params.email }).then(user => {
    res.json(user);
    //   if(user){
    //     if (user[0].password === req.params.password){
    //       res.json(user);
    //     }
    //     else {res.json('ERROR')}
    //   }
    //   else {res.json('ERROR')}
  });
});

module.exports = router;
