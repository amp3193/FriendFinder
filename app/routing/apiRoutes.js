const friendsReq = require('./data/friends.js')(friends);

function apiRoutes(friends) {
    app.get('/api/friends', function(req, res){
        return res.json(friends);
      });

      app.post('/api/friends', function (req, res) {
        let newFriend = req.body;
        console.log(newFriend);
        friends.push(newFriend);
        res.json(newFriend);
      });
}

module.export(apiRoutes);

//TODO logic for matching the results of the against my stats

// Directions: Your apiRoutes.js file should contain two routes:

// A GET route with the url /api/friends. This will be used to display a JSON of 
//all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. 
//This route will also be used to handle the compatibility logic.

