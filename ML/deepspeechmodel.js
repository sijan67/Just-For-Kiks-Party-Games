const fs = require("fs");
const DeepSpeech = require("deepspeech");
const Wav = require("node-wav");

const modelPath = 'models/default_model.pbmm';
const scorerPath = 'models/default_model.scorer';

const triviaHotWords = {
    'a' : 10,
    'b' : 7,
    'c' : 10,
    'd' : 10,
    'one' : 7, 
    'two' : 7,
    'three' : 7,
    'four' : 7,
    'five' : 7,
    'six' : 7,
    'seven' : 7,
    'eight' : 7,
    'nine' : 7, 
    'ten' : 7
};

class DeepSpeechModel {
    // Constructor method
    constructor() {
        this.model = new DeepSpeech.Model(modelPath);
        this.sampleRate = this.model.sampleRate();
        this.hotWords = {};
        
        this.model.enableExternalScorer(scorerPath);
    }

    // Destructor method
    FreeDeepSpeech() {
        DeepSpeech.FreeModel(this.model);
    }

    GetSampleRate() {
        return this.sampleRate;
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
    };

    // Validate the audio
    async ValidateAudio(audio, isfile) {
        let audioBuffer;
        if (isfile) {
          let extension = audio.split('.').pop();
          if (extension != 'wav') {
            return false;
          }
      
          audioBuffer = await fs.promises.readFile(audio);
        } else {
          audioBuffer = audio;
        }
      
        let decodedAudio = Wav.decode(audioBuffer);
        if (decodedAudio.sampleRate != this.sampleRate) {
          console.error(`Warning, sample rate of audio file is ${decodedAudio.sampleRate}` +
                        `. Expected a sample rate of ${this.sampleRate}`);
          return null;
        }
      
        return audioBuffer;
    }
      
    // translate
    async Translate(audio, isfile) {
        try {
          const validatedAudio = await this.ValidateAudio(audio, isfile);
          if (validatedAudio == null) {
            console.error(`Failed to validate audio.`);
            return;
          }
          
          const transcript = this.model.stt(validatedAudio);
          return transcript;
        } catch (error) {
          throw `Failed to perform translation: ${error}`;
        }
    }
}

module.exports = { DeepSpeechModel, triviaHotWords };