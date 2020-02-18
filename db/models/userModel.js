const mongoose = require('../connection');
const validator = require('validator');

const UserSchema = new mongoose.Schema({  
  image: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  name: { type: String },
  age: { type: Number },
  gender: { type: String },
  favoriteActivities: [
    {
      image: { type: String },
      id: { type: Number }
    }
  ],
  favoriteCoding: [
    {
      image: { type: String },
      id: { type: Number }
    }
  ],
  genderInterest: { type: String },
  keep: [],
  password: {
    type: String
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
