const mongoose = require("mongoose"); 
const Question = require('./models/Question');

getQuestionById = (questionID) => {
    return new Promise((resolve, reject) => {
        if (!questionID) {
            reject("No question specified");
        }
        Question.findById(questionID).then((question) => {
            if (question) {
                resolve(question);
            } else {
                reject("Question not found");
            }
        }, (err) => {
            reject(err);
        });
    });
}

