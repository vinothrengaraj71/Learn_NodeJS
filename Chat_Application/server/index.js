require("dotenv").config();
require("./config/db.config.js");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
