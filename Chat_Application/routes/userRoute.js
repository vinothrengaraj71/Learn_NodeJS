const express = require('express');
const user_route = express();
const {
  register,
  registerLoad,
  login,
  loginLoad,
  logout,
  dashboard,
} = require('../controllers/userController');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

user_route.use(express.static('public'));

//implement validation for image format --- pending
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    const name = 'Void Chat App ' + Date.now();
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

user_route.get('/register', registerLoad);
user_route.post('/register', upload.single('image'), register);
user_route.get('/', loginLoad);
user_route.post('/', login);
user_route.get('/logout', logout);
user_route.get('/dashboard', dashboard);
user_route.get('/*', (req, res) => {
  res.redirect('/');
});

module.exports = user_route;
