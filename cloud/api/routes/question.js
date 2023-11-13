const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Question = require('../models/Question');

/* GET Operations */

// GET all questions
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

// GET a question by ID
router.get("/:questionID", (req, res, next) => {
    const questionID = parseInt(req.params.questionID);
    Question.find({ questionID }, "questionID description alternatives").then(question => {
        if (question !== null) {
            res.json(question);
        } else {
            res.write("No questions found");
        }
    })
});

/* DELETE Operations */

// DELETE a question by ID
router.delete("/:questionID", (req, res, next) => {
    const questionID = parseInt(req.params['questionID']);

    Question.deleteOne({ questionID }).then(result => {
        if (result.deletedCount === 1) {
            res.status(200).send("Question deleted");
        } else {
            res.status(404).send("Question not found");
        }
    }).catch(error => {
        res.status(500).send(error.message);
    });
});

module.exports = router;

