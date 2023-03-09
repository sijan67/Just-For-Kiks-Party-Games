const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    questionID: String,
    description: String,
    answer: String,
    alternatives: [
        {
            choice: {
                type: String,
            },
            content: {
                type: String,
            },
        }
    ]
})

module.exports = QuestionSchema;