const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Question = require('../models/Question');

router.get("/", (req, res, next) => {
    Question.find({}, "questionID description alternatives").then(questions => {
        if (questions !== null && questions.length > 0) {
            res.write(JSON.stringify(questions));
        } else {
            res.write("No questions found");
        }
        res.end();
    });
});

router.get("/:questionID", (req, res, next) => {
    const questionID = parseInt(req.params);
    Question.find({ questionID }, "questionID description alternatives").then(question => {
        if (question !== null && question.length > 0) {
            res.write(JSON.stringify(question[0]));
        } else {
            res.write("No questions found");
        }
    })
});

module.exports = router;

