const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

const Question = require('./models/Question') 

// get all questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find()
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// get a question according to its id
router.get('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const question = await (await Question.findOne({_id}))
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// create a question
router.post('/questions', async (req, res) => {
    try {
        const { description } = req.body
        const { answer } = req.body

        const question = await Question.create({
            description,
            answer
        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// update a question according to its id
router.put('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 
        const { description, answer } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                description,
                answer
            })    
            return res.status(201).json(question)
        }else{
            // updates only the given fields
            if (description) {
                question.description = description
            }
            if (answer) {
                question.answer = answer
            }
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// delete a question according to its id
router.delete('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const question = await Question.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})


module.exports = router
