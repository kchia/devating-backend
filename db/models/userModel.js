const mongoose = require ('../connection');

const UserSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  favoriteActivities: [{ type: String, required: true }],
  favoriteCoding: [{ type: String, required: true }],
  genderInterest: [{ type: String, required: true }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;