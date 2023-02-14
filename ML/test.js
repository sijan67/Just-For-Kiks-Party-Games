import DeepSpeechModel, { numberHotWords } from "./deepspeechmodel.js";

const dp = new DeepSpeechModel();
dp.SetHotWords(numberHotWords);

let translation = dp.Translate('./common_voice_en_21875014.wav');
console.log(`translated msg is: ${translation}`);