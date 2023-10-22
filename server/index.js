const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "../client")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, ));
});

app.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/login.html"));
});

app.get("/signup", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/signup.html"));
});


app.listen(8081, () => {
  console.log("Server started at http://localhost:" + 8081);
});
