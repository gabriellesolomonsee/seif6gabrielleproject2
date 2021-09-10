const express = require("express");
// const session = require("express-session");
const papersModel = require("../models/papers");
const controller = express.Router();

// controller.use(session({
//   secret: "thisIsAsecretKey",
//   resave: false,
//   saveUninitialized: false,
// }));

// controller.get("/login", (req, res) => {
//   // assume that the user logins successfully, a session will be created
//   req.session.userLoggedIn = true;
//   req.session.displayName = "Zhiquan";
//   // sessionId1234: {
//   //  userLoggedIn,
//   //  displayName
//   // }
//   // pass sessionId1234 back to the user -> browser -> cookie
//   res.send("User logged in successfully");
// });

// controller.get("/isUserLoggedIn", (req, res) => {
//   console.log(req);
//   // JWT authentication
//   // browser -> sessionId from cookie -> pass it to the server
//   // server will find sessionId1234 in the memory, if id exists
//   // it will return the object linked to it, userLoggedIn and displayName
//   res.send(`Are you logged in? ${req.session.userLoggedIn}.\nYour name is ${req.session.displayName}`);
// })

controller.get("/", async (req, res) => {
  const papersSortedByRecentDate = await papersModel
    .find()
    .sort({ publishedDate: "desc" })
    .limit(6)
    .exec();

  const mostRecentPapers = papersSortedByRecentDate[0];
  const nextRecentPapers = papersSortedByRecentDate.slice(1);

  const success = req.query.success;
  const action = req.query.action;

  res.render("homepage.ejs", {
    mostRecentPapers,
    nextRecentPapers,
    success,
    action,
  });
});

module.exports = controller;