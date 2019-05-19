const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);
//require('./data/friends.js')(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });