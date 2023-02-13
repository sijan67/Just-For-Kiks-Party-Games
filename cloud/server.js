const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');


mongoose.connect("mongodb://my_user:my_pwd@localhost:27017/mern", { useNewUrlParser: true });

const Schema = mongoose.Schema;
const questionSchema = new Schema({
    description: String,
    answer: String
});
const Question = mongoose.model("question", questionSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(`${__dirname}/favicon.ico`));
});

app.get('/questions', (req, res) => {
    Question.find({}, "description answer").then(questions => {
        if (questions !== null && questions.length > 0) {
            res.write(JSON.stringify(questions));
        } else {
            res.write("No questions found");
        }
        res.end();
    });
}).listen(8000);