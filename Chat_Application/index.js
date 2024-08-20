require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

require('./config/db.config.js');
const userRoute = require('./routes/userRoute');
const User = require('./models/userModel.js');

const port = 3001;

app.use('/', userRoute);

var usp = io.of('/user-namespace');

usp.on('connection', async (socket) => {
  console.log('A user connected to the user namespace');

  var userId = socket.handshake.auth.token;

  try {
    await User.findByIdAndUpdate({ _id: userId }, { $set: { is_online: '1' } });
    //broadcasting User Online
    socket.broadcast.emit('getOnlineUser',{ user_id:userId});
    console.log(`User ${userId} is now online.`);
  } catch (error) { 
    console.error('Error updating user status:', error);
  }

  socket.on('disconnect', async () => {
    console.log('User disconnected from the user namespace');
    try {
      await User.findByIdAndUpdate({ _id: userId }, { $set: { is_online: '0' } });


      //broadcasting User Online
      socket.broadcast.emit('getOfflineUser',{ user_id:userId});
      console.log(`User ${userId} is now offline.`);
    } catch (error) {
      console.error('Error updating user status on disconnect:', error);
    }
  });
});

app.set('view engine', 'ejs');
app.set('views', './views');

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
