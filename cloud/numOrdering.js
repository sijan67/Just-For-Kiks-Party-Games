app.get('/numberOrdering/numberlist1', (req, res) => {
    NumberOrdering.find({}, "username teamname teamscore roomcode").then(users => {
        if (users !== null && users.length > 0) {
            res.write(JSON.stringify(users[0]));
        } else {
            res.write("No users found");
        }
        res.end();
    });
});