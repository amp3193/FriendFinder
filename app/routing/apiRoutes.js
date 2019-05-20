const friendsData = require('../data/friends');

function findMatch(incomingFriend) {
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

      });
}
