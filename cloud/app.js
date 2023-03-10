const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb://my_user:my_pwd@localhost:27017/mern", { useNewUrlParser: true });

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
app.get('/questions', questionRoutes)

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

