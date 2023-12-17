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

app.get("/feed", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/feed.html"));
});

app.get("/explore", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/explore.html"));
});

app.get("/users", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/users.html"));
});

app.listen(8088, () => {
  console.log("Server started at http://localhost:" + 8088);
});
