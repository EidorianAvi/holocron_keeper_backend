const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Enable CORS
app.use(cors());

// Imported Routes
const userRoute = require('./routes/users');
const novelRoute = require('./routes/novels');

app.use('/users', userRoute);
app.use('/novels', novelRoute)

//ROOT Route
app.get('/', (req, res) => {
    res.send("Welcome to the back-end of Holocron Keeper");
});

//Connect to MongoDB Database
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => console.log("Successful database connection")
);

//Listen to port 9000
app.listen(9000);