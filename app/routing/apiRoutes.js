const friendsData = require('../data/friends');

module.exports = function(app) {
    app.get('/api/friends', function(req, res){
        return res.json(friendsData);
      });

      app.post('/api/friends', function (req, res) {
        let newFriend = req.body;
        console.log(newFriend);
        friendsData.push(newFriend);
        res.json(newFriend);

        //check friendsData.length for each survey result if sum of survey results == my survey sum then assign to match variable 
      });
}



//TODO logic for matching the results of the against my stats

// Directions: Your apiRoutes.js file should contain two routes:

// A GET route with the url /api/friends. This will be used to display a JSON of 
//all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. 
//This route will also be used to handle the compatibility logic.

