const path = require("path");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
      });
      
      app.get("/survey.html", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
      });
      
      app.get("/survey.css", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.css"));
      });
      
      app.get("/survey.js", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.js"));
      });
}
