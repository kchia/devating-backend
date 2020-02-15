const mongoose = require('../connection');

const UserSchema = new mongoose.Schema({
  image: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
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
  password: { type: String, required: true },
  passwordConfirm: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
