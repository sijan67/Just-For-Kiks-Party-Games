const { triviaHotWords, DeepSpeechModel } = require("./deepspeechmodel");

const dp = new DeepSpeechModel();

function translateAndLog() {
    dp.SetHotWords(triviaHotWords);
    let translation = dp.Translate('./test_audio.wav', true);
    console.log(`translated msg is: ${translation}`);
}

translateAndLog();