const express = require("express");
const mongoose = require("mongoose");
const Question = require('../models/Question');
const Team = require('../models/Team');

const router = express.Router();

const { triviaHotWords, DeepSpeechModel } = require("../../ML/deepspeechmodel");

// Params for hardware to use in game flow
let post_answer = {
  "questionID" : 0,
  "teamID" : 0,
  "result" : "false",
  "updated" : false,
}

// Mapping numbers spoken from user to answers in database
const number_to_letter_map = {
  "one" : "A",
  "two" : "B",
  "three" : "C",
  "four" : "D"
}

// Finds the largest substring to differentiate spoken words from noise
function findLargestSubstring(str) {
  const words = str.split(" ");
  let smallestLength = 0;
  let smallestIndex = 0;
  
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > smallestLength) {
      smallestLength = words[i].length;
      smallestIndex = i;
    }
  }

  return words[smallestIndex];
}

// POST audio
router.post('/', async (req, res) => {
  try {
    // Obtain parameters set param info for hardware
    const { questionID, teamID, audioFile } = req.body;
    post_answer["questionID"] = questionID;
    post_answer["teamID"] = teamID;

    // Get question
    const question = await Question.findOne({ questionID }, "questionID description alternatives answer");
    if (!question) return res.status(404).send("Question not found");
    const answer = question.answer;

    // Transcribe audio
    const buffer = Buffer.from(audioFile, 'base64');
    const deepspeech_model = new DeepSpeechModel();
    deepspeech_model.SetHotWords(triviaHotWords);
    const transcript = deepspeech_model.Translate(buffer, false).trim();
    const filtered_transcript = findLargestSubstring(transcript);

    console.log(`Unfiltered transcript is: ${transcript}`);
    console.log(`Transcripted msg is: ${filtered_transcript}`);

    // If filtered_transcript has noise or incorrectly transcribes, retry
    if (filtered_transcript.length == 1 || !number_to_letter_map.hasOwnProperty(filtered_transcript)) return res.status(404).send("Retry");

    const mapped_transcript = number_to_letter_map[filtered_transcript];

    if (mapped_transcript == answer) {

      post_answer["result"] = 'true';
      post_answer["updated"] = true;

      const team = await Team.findOneAndUpdate({ teamID }, { $inc: { teamScore: 100 } }, { new: true });
      if (!team) return res.status(404).send('Team not found');

      post_answer["result"] = "true";
      post_answer["updated"] = true;
  
      console.log("Answer is correct.");
      return res.status(200).json(team);
    }
    else {

      post_answer["result"] = "false";
      post_answer["updated"] = true;
      console.log("Answer is incorrect.");
      return res.status(200).json("answer is not correct");
    }
  } catch (error) {
    console.error('Error performing speech-to-text:', error);
    res.status(500).json({ error: 'Failed to perform speech-to-text' });
  }
});

// GET updates to hardware
router.get('/', async (req, res) => {
  if (post_answer["updated"] == true) {
    post_answer["updated"] = false;
    return res.json({ questionID : post_answer["questionID"], teamID : post_answer["teamID"], result : post_answer["result"]});
  } else {
    return res.send("No answer");
  }
});

module.exports = router;