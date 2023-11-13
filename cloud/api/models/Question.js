const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    questionID: Number,
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

module.exports = mongoose.model('Question',QuestionSchema);