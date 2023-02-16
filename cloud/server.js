const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Question = require('./models/Question');
const User = require('./models/User');

mongoose.connect("mongodb://my_user:my_pwd@localhost:27017/mern", { useNewUrlParser: true });


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(`${__dirname}/favicon.ico`));
});

app.get('/questions', (req, res) => {
    Question.find({}, "questionID description alternatives").then(questions => {
        if (questions !== null && questions.length > 0) {
            res.write(JSON.stringify(questions));
        } else {
            res.write("No questions found");
        }
        res.end();
    });
}).listen(8000);

app.get('/users', (req, res) => {
    User.find({}, "username teamname teamscore roomcode").then(users => {
        if (users !== null && users.length > 0) {
            res.write(JSON.stringify(users));
        } else {
            res.write("No users found");
        }
        res.end();
    });
});

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

app.get('/users/username', (req, res) => {
    User.find({}, "username").then(users => {
        if (users !== null && users.length > 0) {
            res.write(JSON.stringify(users));
        } else {
            res.write("No users found");
        }
        res.end();
    });
});

app.get('/users/roomcode', (req, res) => {
    User.find({}, "roomcode").then(users => {
        if (users !== null && users.length > 0) {
            res.write(JSON.stringify(users));
        } else {
            res.write("No users found");
        }
        res.end();
    });
});

app.get('/users/teamname', (req, res) => {
    User.find({}, "teamname").then(users => {
        if (users !== null && users.length > 0) {
            res.write(JSON.stringify(users));
        } else {
            res.write("No users found");
        }
        res.end();
    });
});