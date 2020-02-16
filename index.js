const express = require('express');
const app = express();

const matchController = require('./controllers/matchController');
const userController = require('./controllers/userController');

const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', matchController);
app.use('/', userController);
app.set('port', process.env.PORT || 7000);

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
