// const express = require('express');
// const path = require('path');
// const app = express();
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const { DeepSpeechModel, triviaHotWords } = require('../ML/deepspeechmodel');

// const QuestionSchema = require('./models/Question');
// const UserSchema = require('./models/User');

// const Database = require('./database');
// const db = new Database('mongodb://my_user:my_pwd@localhost:27017/mern');
// const Question = db.model('Question', QuestionSchema);
// const User = db.model('User', UserSchema);

// const deepspeech_model = new DeepSpeechModel();
// deepspeech_model.SetHotWords(triviaHotWords);

// app.use(bodyParser.json());

const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(8000);


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.get('/favicon.ico', (req, res) => {
//     res.sendFile(path.join(`${__dirname}/favicon.ico`));
// });

// app.get('/questions', (req, res) => {
//     Question.find({}, "questionID description alternatives").then(questions => {
//         if (questions !== null && questions.length > 0) {
//             res.write(JSON.stringify(questions));
//         } else {
//             res.write("No questions found");
//         }
//         res.end();
//     });
// })

// app.get('/users', (req, res) => {
//     User.find({}, "username teamname teamscore roomcode").then(users => {
//         if (users !== null && users.length > 0) {
//             res.write(JSON.stringify(users[0]));
//         } else {
//             res.write("No users found");
//         }
//         res.end();
//     });
// });

// app.post('/users/name', (req, res) => {
// 	var data = req.body;
// 	console.log(data);
// 	if(data == undefined) {
// 		res.status(400).send("Name is required");
// 	} 
// 	else if(data.name == undefined) {
// 		res.status(400).send("Name is required");
// 	}
// 	else {
// 		var user = {
// 			username: data.name,
// 		}

// 		db.collection('users').insertOne(user, function(err, result) {
//             if(err) {
//                 res.status(500).send("Error");
//             }
//             else {
//                 res.status(200).send("Success");
//             }
//         });
        
//     }
// });

// app.post('/users/roomcode', (req, res) => {
// 	var data = req.body;
// 	console.log(data);
// 	if(data == undefined) {
// 		res.status(400).send("Roomcode is required");
// 	} 
// 	else if(data.name == undefined) {
// 		res.status(400).send("Roomcode is required");
// 	}
// 	else {
// 		var userInfo = {
//             username: data.name,
// 			roomcode: data.roomcode,
// 		}

//         if(db.collection('users').find({username}).count() == 0) {
//             db.collection('users').insertOne(userInfo, function(err, result) {
//                 if(err) {
//                     res.status(500).send("Error");
//                 }
//                 else {
//                     res.status(200).send("Success");
//                 }
//             }
//         )}
//         else {
//             db.collection('users').update(userInfo, function(err, result) {
//                 if(err) {
//                     res.status(500).send("Error");
//                 }
//                 else {
//                     res.status(200).send("Success");
//                 }
//             });
//         }
//     }
// });


// POST endpoint for receiving audio file
// app.post('/audio', async (req, res) => {
//     const audioFileData = req.body.audioFile;
//     const questionID = req.body.questionID;
  
//     // Decode base64-encoded audio file data
//     const audioFileBuffer = Buffer.from(audioFileData, 'base64');

//     let transcript = await deepspeech_model.Translate(audioFileBuffer, false); 

//     const question = await Question.findOne({ questionID: questionID }).exec();
    
//     res.write(JSON.stringify(transcript == question.answer));
// });