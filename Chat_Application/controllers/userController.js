const User = require('../models/userModel');
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
        messge: 'Your Registration has been Complete!',
      });
    } catch (error) {
      console.log(error);
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
        
        const userData = await User.findOne({
            email:email
        });

        if(userData){
            const passwordMatch = bcrypt.compare(password,userData.password);
            if(passwordMatch){
                req.session.user = userData;
                res.redirect('/dashboard');
                return;
            }
        }
        else{
            console.render('login',{message:'Email and Password is Incorrect!'});
        }

    } catch (error) {
      console.log(error.message);
    }
  },

  logout: async (req, res) => {
    try {

        req.session.destroy();
        res.redirect('/');
    } catch (error) {
      console.log(error.message);
    }
  },

  dashboard: async (req, res) => {
    try {
        res.render('dashboard',{user:req.session.user});
    } catch (error) {
      console.log(error.message);
    }
  },
};
