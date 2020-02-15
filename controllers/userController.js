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
  let finalUsers = [];
  let isMatched = false;
  User.find({ email: req.params.email }).then(user => {
    currentUser = user;
    User.find({ gender: user[0].genderInterest }).then(users => {
      for (let i = 0; i < users.length; i++) {
        if (
          users[i].genderInterest === currentUser[0].gender &&
          users[i].email !== currentUser[0].email
        ) {
          for (let j = 0; j < users[i].favoriteCoding.length; j++) {
            for (let k = 0; k < users[i].favoriteCoding.length; k++) {
              if (
                currentUser[0].favoriteCoding[j].id ===
                users[i].favoriteCoding[k].id
              ) {
                isMatched = true;
              }
            }
          }
          if (isMatched == true) {
            matchedUsers.push(users[i]);
            isMatched = false;
          }
        }
      }
      isMatched = false;

      for (let l = 0; l < matchedUsers.length; l++) {
        for (let m = 0; m < matchedUsers[l].favoriteActivities.length; m++) {
          for (let n = 0; n < matchedUsers[l].favoriteActivities.length; n++) {
            if (
              currentUser[0].favoriteActivities[m].id ===
              users[l].favoriteActivities[n].id
            ) {
              isMatched = true;
            }
          }
        }
        if (isMatched == true) {
          finalUsers.push(matchedUsers[l]);
          isMatched = false;
        }
      }

      res.json(finalUsers);
    });
    //match the currentUser to other users who have one of matching favorite codings

    //match the currentUser to other users who have one of matching favorite activities
  });
  // collect the gender interests of all other users

  //res.json(users);

  // find gender interest of currentUser and return all users whose gender interest !== currentUser.genderInterest

  // let matchedUsers =
});

module.exports = router;
