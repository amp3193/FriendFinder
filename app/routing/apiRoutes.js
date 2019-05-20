const friendsData = require('../data/friends');

function findMatch(incomingFriend) {
  // TODO implement
  let bestFriend = undefined;
  let bestScore = undefined;

  for (let i = 0; i < friendsData.length; i++) {
    const thisFriend = friendsData[i];
    const thisScore = computeScore(incomingFriend, thisFriend);
    if (bestFriend) {
      if (thisScore < bestScore) {
        bestScore = thisScore;
        bestFriend = thisFriend;
      }
    } else {
      bestFriend = thisFriend;
      bestScore = thisScore;
    }
  }

  return bestFriend;
}

function computeScore(incomingFriend, possibleFriend) {
  let totalDifference = 0;
  
  const numQuestions = incomingFriend.scores.length;
  for (let i = 0; i < numQuestions; i++) {
    const a = incomingFriend.scores[i];
    const b = possibleFriend.scores[i];
    const difference = Math.abs(a - b);

    totalDifference += difference;
  } 
  
  return totalDifference;
}

function storeFriend(incomingFriend) {
  friendsData.push(incomingFriend);
}

module.exports = function(app) {
    app.get('/api/friends', function(req, res){
        return res.json(friendsData);
      });

      app.post('/api/friends', function (req, res) {
        const newFriend = req.body;
        console.log("Received survey: " + newFriend);
        
        const bestMatch = findMatch(newFriend);
        console.log("Sending survey response: " + bestMatch);
        
        storeFriend(newFriend);

        res.json(bestMatch);

        //check friendsData.length for each survey result if sum of survey results == my survey sum then assign to match variable 
      });

      // function checkForMatch() {

      // }
}




//TODO logic for matching the results of the against my stats

// Directions: Your apiRoutes.js file should contain two routes:

// A GET route with the url /api/friends. This will be used to display a JSON of 
//all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. 
//This route will also be used to handle the compatibility logic.

