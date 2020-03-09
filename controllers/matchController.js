// Consider adding proper error handling for all your routes. See Jen's tutorial: https://git.generalassemb.ly/jmeade11/mern-auth-tutorial#handling-errors-in-express-apis

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

// Hou comment: nice job trying out the async/await pattern here!
const matchUsers = async (req, res) => {
  let currentUser;
  let matchedUsers = [];
  let finalUsers = [];
  let isMatched = false;

  // Since you're using async/await, you no longer have to use a promise method like .then() to handle the promise
  // Instead you can do something like:
  // const user = await User.find({ email: req.params.email }); --> JavaScript will wait until this promise resolves before moving on to the next line
  // currentUser = user;
  // It is also common to wrap an awaited function inside of a try/catch block. Read more here: https://developers.google.com/web/fundamentals/primers/async-functions

  await User.find({ email: req.params.email }).then(user => {
    currentUser = user;
    // You can also use async/await for the async call on line 38
    User.find({ gender: user[0].genderInterest }).then(users => {
      // Can you think of a way to separate the logic lines 40-81 into separate functions for better readability?
      for (let i = 0; i < users.length; i++) {
        if (
          // Instead of accessing currentUser[0] repeatedly below, can we store the value in a variable for reuse?
          // const currentUserObject = currentUser[0];
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

      // Is there a way to optimize the algorithm below by converting favoriteActivities into a Set data structure?
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
// remove comment
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

// remove unused code below
// const updateMatchKeepRemove = (req, res) => {
//   // find the user by their email
//   const email = req.params.email;
//   // find the saving user by their email
//   const removeEmail = req.params.removeEmail;
//   const query = { email: email };
//   var update = { $set: { keep: removeEmail } };
//   var options = { new: true };

//   User.findOneAndUpdate(query, update, options, function(err, user) {
//     if (err) {
//       res.json(['error']);
//     }
//     res.json([user]);
//   });
// };

const updateKeep = (req, res) => {
  const email = req.params.email;
  const keep = req.body.keep;
  const query = { email: email };
  let update = { $set: { keep: keep } };
  let options = { new: true };

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

router.get('/get/:email', getUser);

// -------------------------- Update the user's saved list of users (Adding a new matching user)---------------------------------//
router.put('/save/:email/:saveEmail', updateMatchKeepAdd);

// -------------------------- Update the user's saved list of users (Removing a new matching user) ---------------------------------//
router.put('/update/:email', updateKeep);

module.exports = router;
