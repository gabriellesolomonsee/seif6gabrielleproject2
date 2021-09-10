const express = require("express");
const controller = express.Router();

controller.get("/showQuestions", (req, res) => {
  res.render("questions/showQuestions.ejs");
});

// controller.get("/login", (req, res) => {
//   res.render("users/login.ejs");
// });

module.exports = controller;