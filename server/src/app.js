const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("TalkBox API Running");
});

module.exports = app;
