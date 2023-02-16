const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    questionID: String,
    description: String,
    alternatives: [
        {
            choice: {
                type: String,
            },
            content: {
                type: String,
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ]
})

module.exports = mongoose.model('Question', QuestionSchema)