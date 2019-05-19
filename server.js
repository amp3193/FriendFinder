const express = require("express");
const path = require("path");
const apis = require('./app/routing/apiRoutes')(apiRoutes);
const htmls = require('./app/routing/htmlRoutes')(htmlRoutes);
const friends = require('./data/friends.js')(friends);


var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });