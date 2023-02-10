const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    description: String,
    answer: String
})

module.exports = mongoose.model('Question', QuestionSchema)