const express = require('express');
const app = express();
var queryParser = require('express-query-int');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const questionRoutes = require("./api/routes/question");
const userRoutes = require("./api/routes/user");
const teamRoutes = require("./api/routes/team");
const audioRoute = require("./api/routes/audio");
const roomRoutes = require("./api/routes/room");

mongoose.connect("mongodb://my_user:my_pwd@localhost:27017/mern", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(queryParser());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Routes for handling requests
app.use('/questions', questionRoutes);
app.use('/users', userRoutes);
app.use('/teams', teamRoutes);
app.use('/audio', audioRoute);
app.use('/room', roomRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
        message: error.message
        }
    });
});

module.exports = app;