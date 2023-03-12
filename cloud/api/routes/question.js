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
    const questionID = req.params.questionID;
    Question.findOne({ questionID: questionID }, "questionID description alternatives").then(questions => {
        if (questions !== null) {
            res.write(JSON.stringify(questions[0]));
        } else {
            res.status(404).json({ error: "Question not found" });
        }
    }).catch(error => {
        res.status(500).json({ error: "Server error" });
    });
});

module.exports = router;

