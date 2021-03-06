require("dotenv").config();


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const useRouter = require('./routes/routes');
const todoRouter = require('./routes/todoRoute');
var cors = require('cors')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', (error) => console.log('Connect to Database'))
db.once('open', () => console.log("Connected to database"))
app.listen(3030, () => console.log('Server Started'));

// app.use(cors)
app.use(express.json())
app.use('/users',cors(), useRouter);
app.use('/todo',cors() ,todoRouter);
