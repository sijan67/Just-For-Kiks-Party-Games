const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Question = require('./api/models/Question');

router.get("/", (req, res, next) => {
    Question.find()
      .exec()
      .then(docs => {
        res.write(JSON.stringify(docs[0]));
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
    });
});

router.get("/:questionID", (req, res, next) => {
    const questionID = req.params.questionID;
    Question.findOne({ questionID }, "questionID description alternatives").then(question => {
        if (question !== null) {
            res.write(JSON.stringify(question[0]));
        } else {
            res.status(404).json({ error: "Question not found" });
        }
    }).catch(error => {
        res.status(500).json({ error: "Server error" });
    });
});


