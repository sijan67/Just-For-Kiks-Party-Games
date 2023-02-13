const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionSchema = new Schema({
    description: String,
    answer: String
});
const Question = mongoose.model("question", questionSchema);

mongoose.connect("mongodb://my_user:my_pwd@localhost:27017/mern", { useNewUrlParser: true });
const http = require('http');
http.createServer((req, res) => {
    Question.find({}, "description answer").then(questions => {
        if (questions !== null && questions.length > 0) {
            res.write(JSON.stringify(questions));
        } else {
            res.write("No questions found");
        }
        res.end();
    });
}).listen(8000);