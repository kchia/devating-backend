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
  let currentUser = [];
  User.find({ email: req.params.email }).then(user => {
    currentUser = user;
    User.find({ genderInterest: user[0].genderInterest }).then(users => {
      res.json(users);
      //   let matchedUsers = [];
      //   for (i = 0; i < users.length; i++) {
      //     if (users[i].genderInterest === currentUser.gender) {
      //       matchedUsers.push(users[i]);
      //     }
      //   }
      //   res.json(matchedUsers);
    });
  });
  // collect the gender interests of all other users

  //res.json(users);

  // find gender interest of currentUser and return all users whose gender interest !== currentUser.genderInterest

  // let matchedUsers =
});

module.exports = router;
