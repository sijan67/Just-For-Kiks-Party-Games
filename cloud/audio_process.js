const { triviaHotWords, DeepSpeechModel } = require("../ML/deepspeechmodel");

const dp = new DeepSpeechModel();

async function translateAndLog() {
    dp.SetHotWords(triviaHotWords);
    let translation = await dp.Translate('./common_voice_en_21875014.wav', true);
    console.log(`translated msg is: ${translation}`);
}

translateAndLog();