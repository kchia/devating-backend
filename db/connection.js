const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/devating', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
module.exports = mongoose;
