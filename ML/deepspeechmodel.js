// const fs = require('fs');
// const path = require('path');
// const DeepSpeech = require('deepspeech');
// const Wav = require("node-wav");

import fs from "fs";
import DeepSpeech from "deepspeech";
import Wav from "node-wav";

const modelPath = 'models/default_model.pbmm';
const scorerPath = 'models/default_model.scorer';

export const letterHotWords = {
    // 'a' : 5,
    // 'b' : 5,
    // 'c' : 10,
    // 'd' : 10
};

export const numberHotWords = {
    // 'one' : 10,
    'two' : 7,
    // 'three' : 10,
    // 'four' : 10
};

export default class DeepSpeechModel {
    // Constructor method
    constructor() {
        this.model = new DeepSpeech.Model(modelPath);
        this.sampleRate = this.model.sampleRate();
        this.hotWords = {};
        
        this.model.enableExternalScorer(scorerPath);
    }

    GetSampleRate() {
        return this.sampleRate;
    }

    // Destructor method
    FreeDeepSpeech() {
        DeepSpeech.FreeModel(this.model);
    }

    // Set Hot words
    SetHotWords(words) {
        for (let word in words) {
            this.model.addHotWord(word, words[word]);
            this.hotWords[word] = words[word];
        }
    }

    ClearHotWords() {
        this.model.clearHotWords();
        this.hotWords = {};
    }

    // Validate the audio
    ValidateAudio(audio) {
        let extension = audio.split('.').pop();
        if (extension != 'wav') {
            return false;
        }
        
        let audioBuffer = fs.readFileSync(audio)

        let decodedAudio = Wav.decode(audioBuffer);
        if (decodedAudio.sampleRate != this.sampleRate) {
            console.error(`Warning, sample rate of audio file is ${decodedAudio.sampleRate}` +
                          `. Expected a sample rate of ${this.sampleRate}`);
            return null;
        }

        return audioBuffer;
    }

    // Translation
    Translate(audio) {
        let validatedAudio = this.ValidateAudio(audio);
        if (validatedAudio == null) {
            console.error(`Failed to validate audio.`);
            return;
        }

        try {
            let transcript = this.model.stt(validatedAudio);
            return transcript
        }
        catch (error) {
            throw `Failed to perform translation: ${error}`;
        }
    }
}