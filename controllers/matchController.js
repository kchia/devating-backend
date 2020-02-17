const express = require('express');
const router = express.Router();

const User = require('../db/models/userModel');

// ------------------------ OUR HANDLERS ----------------------------------- //

const getUsers = (req, res) => {
  User.find({}).then(users => {
    res.json(users);
  });
};

const getUser = (req, res) => {
  User.find({ email: req.params.email }).then(user => {
    res.json(user);
  });
};

const matchUsers = async (req, res) => {
  let currentUser;
  let matchedUsers = [];
  let finalUsers = [];
  let isMatched = false;
  await User.find({ email: req.params.email }).then(user => {
    currentUser = user;
    User.find({ gender: user[0].genderInterest }).then(users => {
      for (let i = 0; i < users.length; i++) {
        if (
          users[i].genderInterest === currentUser[0].gender &&
          users[i].email !== currentUser[0].email
        ) {
          for (let j = 0; j < currentUser[0].favoriteCoding.length; j++) {
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
        for (let m = 0; m < currentUser[0].favoriteActivities.length; m++) {
          for (let n = 0; n < matchedUsers[l].favoriteActivities.length; n++) {
            if (
              currentUser[0].favoriteActivities[m].id ===
              matchedUsers[l].favoriteActivities[n].id
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
  });
};
// declare current user

const updateMatchKeepAdd = (req, res) => {
  // find the user by their email
  const email = req.params.email;
  // find the saving user by their email
  const saveEmail = req.params.saveEmail;
  const query = { email: email };
  var update = { $push: { keep: saveEmail } };
  var options = { new: true };

  User.findOneAndUpdate(query, update, options, function(err, user) {
    if (err) {
      res.json(['error']);
    }
    res.json([user]);
  });
};

const updateMatchKeepRemove = (req, res) => {
  // find the user by their email
  const email = req.params.email;
  // find the saving user by their email
  const removeEmail = req.params.removeEmail;
  const query = { email: email };
  var update = { $pull: { keep: removeEmail } };
  var options = { new: true };

  User.findOneAndUpdate(query, update, options, function(err, user) {
    if (err) {
      res.json(['error']);
    }
    res.json([user]);
  });
};

// ------------------------ OUR ROUTERS ----------------------------------- //
router.get('/', getUsers);

// ------------------ Get the user's email address and matching other users based on their criteria -------------------------------//


router.get('/:email', matchUsers);

// -------------------------- Update the user's saved list of users (Adding a new matching user)---------------------------------//
router.put('/save/:email/:saveEmail', updateMatchKeepAdd);

// -------------------------- Update the user's saved list of users (Removing a new matching user) ---------------------------------//
router.put('/remove/:email/:removeEmail', updateMatchKeepRemove);

module.exports = router;
