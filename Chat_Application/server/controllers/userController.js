const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken= (_id) => {
    const jwtkey = process.env.SECRET;
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3h" });
  };

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { name, username, email, password } = req.body;

      let user = await UserModel.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      if (!name || !username || !req.file || !email || !password) {
        return res.status(400).json({ msg: "Please fill in all fields" });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json("Email must be a valid email");
      }

      if (!validator.isStrongPassword(password)) {
        return res
          .status(400)
          .json(
            "Password must be at least 8 characters long, contain a number, a lowercase letter, an uppercase letter, and a special character"
          );
      }

      const image = req.file.filename;

      user = new UserModel({ name, username, image, email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      const NewUser = await user.save();

      res
        .status(201)
        .json({ msg: "User registered successfully", user: NewUser });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      let user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(400).json({ msg: "Invalid password" });
      }

      const token = createToken(user._id);

      res.status(200).json({ _id: user._id, name: user.name, email, token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },

  findUser : async (req, res) => {
    const userId = req.params.userId;

    try{
        const user = await UserModel.findById(userId);

        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: err.message });
    }
  },

  getUsers : async (req, res) => {
    try{
        const user = await UserModel.find();
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: err.message });
    }
  },
};
