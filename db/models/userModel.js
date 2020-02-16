const mongoose = require('../connection');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  image: String,
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  name: { type: String, required: [true, 'Please tell us your name'] },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  favoriteActivities: [
    {
      image: { type: String, required: true },
      id: { type: Number, required: true }
    }
  ],
  favoriteCoding: [
    {
      image: { type: String, required: true },
      id: { type: Number, required: true }
    }
  ],
  genderInterest: { type: String, required: true },
  keep: [],
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password']
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
