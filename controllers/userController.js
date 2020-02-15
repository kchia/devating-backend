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
  let currentUser = User.find({ email: req.params.email }).then(users => {
    res.json(users)
    console.log(users);
    let currentUserInterest = user.genderInterest;
     
    // collect the gender interests of all other users
    router.get('/', (req, res) => {
      let otherUsersGI = User.find({ genderInterest: req.params.genderInterest }).then(users => {
      res.json(users);
      
      for(let i = 0; i < otherUsersGI.length; i++){
        if (currentUserInterest !== otherUsersGI){
          let matchedUsers = [];
          matchedUsers.push(i);
        } return matchedUsers;
      }
    });
  });
  })

  // find gender interest of currentUser and return all users whose gender interest !== currentUser.genderInterest

  // let matchedUsers = 

});

module.exports = router;
