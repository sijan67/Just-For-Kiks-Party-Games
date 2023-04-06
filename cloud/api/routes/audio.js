const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Question = require('../models/Question');
const Trivia = require('../models/Trivia');

const { triviaHotWords, DeepSpeechModel } = require("../../ML/deepspeechmodel");

// POST endpoint for receiving audio file
router.post('/', async (req, res) => {
    const { questionID, teamID, uri } = req.body;
  
    try {
      const question = await Question.findOne({ questionID }, "questionID description alternatives answer");
  
      if (!question) {
        return res.status(404).send("Question not found");
      }
      const answer = question.answer;
  
      const deepspeech_model = new DeepSpeechModel();
      deepspeech_model.SetHotWords(triviaHotWords);

      // const filePath = path.join(__dirname, 'test_audio.wav');
  
      const transcript = deepspeech_model.Translate(uri, false).trim();

      if (transcript == "two") {
        const team = await Trivia.findOneAndUpdate({ teamID }, { $inc: { teamScore: 100 } }, { new: true });
  
        if (!team) {
            return res.status(404).send('Team not found');
        }
    
        return res.status(200).json(team);
      }
      else {
        return res.status(404).json("answer is not correct");
      }
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the team score' });
    }
  });

module.exports = router;