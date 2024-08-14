require('dotenv').config();
const express = require('express');
const app = express();

require("dotenv").config();
require("./config/db.config.js");

const userRoute = require('./routes/userRoute');
const port = 3001;

app.use('/',userRoute);

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
