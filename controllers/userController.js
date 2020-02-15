const express = require('express');
const router = express.Router();

const User = require('../db/models/userModel');

router.get('/', (req, res) => {
  User.find({}).then(users => {
    res.json(users);
  });
});

router.get('/:email', (req, res) => {
  // declare current user
  let currentUser;
  let matchedUsers = [];
  User.find({ email: req.params.email }).then(user => {
    currentUser = user;
    User.find({ gender: user[0].genderInterest }).then(users => {
      for (let i = 0; i < users.length; i++) {
        if (
          users[i].genderInterest === currentUser[0].gender &&
          users[i].email !== currentUser[0].email
        ) {
          matchedUsers.push(users[i]);
        }
      }
      res.json(matchedUsers);
    });
  });
  // collect the gender interests of all other users

  //res.json(users);

  // find gender interest of currentUser and return all users whose gender interest !== currentUser.genderInterest

  // let matchedUsers =
});

module.exports = router;
