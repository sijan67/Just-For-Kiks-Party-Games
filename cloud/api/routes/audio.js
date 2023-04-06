const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Question = require('../models/Question');
const Team = require('../models/Team');

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

      const dataBuffer = Buffer.from(uri, "hex");
      const audioData = wav.decode(dataBuffer);
      fs.writeFileSync('audio.wav', wav.encode(audioData.channelData, { sampleRate: audioData.sampleRate, bitDepth: audioData.bitsPerSample }));

      const filePath = path.join(__dirname, 'audio.wav');
  
      const transcript = deepspeech_model.Translate(filePath, True).trim();

      if (transcript == answer) {
        const team = await Team.findOneAndUpdate({ teamID }, { $inc: { teamScore: 100 } }, { new: true });

        if (!team) {
          return res.status(404).send('Team not found');
        }
    
        return res.status(200).json(team);
      }
      else {
        return res.status(404).json("answer is not correct");
      }

      // TESTING
      // if (transcript == "two") {
      //   const team = await Team.findOneAndUpdate({ teamID }, { $inc: { teamScore: 100 } }, { new: true });
  
      //   if (!team) {
      //       return res.status(404).send('Team not found');
      //   }
    
      //   return res.status(200).json(team);
      // }
      // else {
      //   return res.status(404).json("answer is not correct");
      // }
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the team score' });
    }
  });

module.exports = router;