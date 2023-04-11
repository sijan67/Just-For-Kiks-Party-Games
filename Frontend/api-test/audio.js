const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// app.post('/audio', upload.single('audio'), (req, res) => {
//   const data = req.file.buffer;
//   console.log(data)
//   console.log('Data type:', typeof data);

//   console.log('Team ID:', req.body.teamID);
//   const dataLength = req.file.size;

//   if (dataLength > 1024 * 1024 * 10) {
//     return res.status(400).send('File too large!');
//   }

//   // Configure the WAV file options
//   const wavOptions = {
//     channels: 2,
//     bitDepth: 16,
//     sampleRate: 56050,
//   };

//   // Write the audio data to a WAV file
//   const wav = require('node-wav');
//   const output = wav.encode(data, wavOptions);
//   fs.writeFileSync('audio.wav', output);

//   res.status(200).json({ text: 'Audio successfully processed!' });
// });

app.post('/upload', upload.single('document'),(req , res) => {
    console.log(req.file, req.body)
});

  
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
