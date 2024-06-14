const express =  require('express');
const dotenv = require("dotenv").config();
const loginRouter = require('./routes/loginRouter');

const app = express();
app.set("port", process.env.PORT || 3005);

const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use('/api', loginRouter);

module.exports = app;