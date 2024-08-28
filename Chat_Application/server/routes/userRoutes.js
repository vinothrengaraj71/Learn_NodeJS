const express = require("express");
const { registerUser, loginUser,findUser, getUsers } = require("../controllers/userController");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  }, 
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser);
router.get("/find/:userId",findUser);
router.get("/",getUsers);

module.exports = router;
