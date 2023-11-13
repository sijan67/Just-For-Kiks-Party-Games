const mongoose = require("mongoose");
const Question = require('./models/Question');

mongoose.connect("mongodb://my_user:my_pwd@localhost:27017/mern", { useNewUrlParser: true });

const http = require('http');
http.createServer((req, res) => {
    Question.find({}, "questionID description alternatives").then(questions => {
        if (questions !== null && questions.length > 0) {
            res.write(JSON.stringify(questions));
        } else {
            res.write("No questions found");
        }
        res.end();
    });
}).listen(8000);

