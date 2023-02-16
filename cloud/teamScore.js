getTeamScore = (teamName) => {
    return new Promise((resolve, reject) => {
        if (!teamName) {
            reject("No team specified");
        }
        TeamScore.findByID(teamName).then((teamScore) => {
            if (teamScore) {
                resolve(teamScore);
            } else {
                reject("Team not found");
            }
        }, (err) => {
            reject(err);
        });
    });
}

updateTeamScore = (teamName, score) => {
    return new Promise((resolve, reject) => {
        if (!teamName) {
            reject("No team specified");
        }
        if (!score) {
            reject("No score specified");
        }
        TeamScore.findByID(teamName).then((teamScore) => {
            if (teamScore) {
                teamScore.score += score;
                teamScore.save().then((updatedTeamScore) => {
                    resolve(updatedTeamScore);
                }, (err) => {
                    reject(err);
                });
            } else {
                reject("Team not found");
            }
        }, (err) => {
            reject(err);
        });
    });
}
   