import fs from "fs";
const { MongoClient } = require('mongodb');
const Database = require('./database.js');
import DeepSpeechModel, { numberHotWords } from "../ML/deepspeechmodel.js";

store_audio = (audio) => {
    let audioBuffer = fs.readFileSync(audio);
    
}

let translation = dp.Translate('./common_voice_en_21875014.wav');
console.log(`translated msg is: ${translation}`);