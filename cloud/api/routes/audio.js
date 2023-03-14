const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Question = require('../models/Question');
const Trivia = require('./api/models/Trivia');
const { deepspeech_model }= require("../app");

// POST endpoint for receiving audio file
router.post('/audio', async (req, res) => {
    try {
        const {audioFile, questionID, teamID } = req.body;

        // Decode base64-encoded audio file data
        const audioFileBuffer = Buffer.from(audioFileData, 'base64');

        let transcript = await deepspeech_model.Translate(audioFileBuffer, false); 
        const question = await Question.findOne({ questionID });
        const team = await Trivia.findOneAndUpdate({ teamid }, {$teamScore: 100});

        if (transcript && question && team) {
            return res.json(transcript == question.answer);
        } else {
            return res.status(404).send('Error');
        }
    } catch (error) {
        res.status(404).send(error);
    }
    
});