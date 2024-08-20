const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const bcrypt = require('bcrypt');

module.exports = {
  registerLoad: async (req, res) => {
    try {
      res.render('register');
    } catch (error) {
      console.log(error);
    }
  },

  register: async (req, res) => {
    try {
      const passwordHash = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        image: 'images/' + req.file.filename,
        password: passwordHash,
      });

      const response = await newUser.save();

      if (!response) {
        return res
          .status(500)
          .json({ message: 'error', error: 'Failed to save user' });
      }

      res.render('register', {
        message: 'Your Registration has been Complete!',
      });
    } catch (error) {
      console.log(error);
      res.status(500).render('register', {
        message: 'An error occurred during registration.',
      });
    }
  },

  loginLoad: async (req, res) => {
    try {
      res.render('login');
    } catch (error) {
      console.log(error.message);
    }
  },

  login: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const userData = await User.findOne({ email: email });

      if (userData) {
        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (passwordMatch) {
          req.session.user = userData;
          res.redirect('/dashboard');
          return;
        } else {
          res.render('login', { message: 'Email and Password are incorrect!' });
        }
      } else {
        res.render('login', { message: 'Email and Password are incorrect!' });
      }
    } catch (error) {
      console.log(error.message);
      res.render('login', {
        message: 'An error occurred. Please try again later.',
      });
    }
  },

  logout: async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.log(err.message);
          res.redirect('/dashboard');
        } else {
          res.redirect('/');
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  dashboard: async (req, res) => {
    try {

     var users = await User.find({_id:{$nin:[req.session.user._id]}});
      res.render('dashboard', { user: req.session.user, users:users });
    } catch (error) {
      console.log(error.message);
    }
  },

  saveChat: async (req,res)=>{
    try {
        var chat = new Chat({
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
        message: req.body.message,
      });

      var newChat = await chat.save();
      res.status(200).send({succes:true,msg:'Chat Inserted!',data:newChat});
    }    catch (error) {
      console.log(error);
    }
  },
}