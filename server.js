require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const homepageController = require("./controllers/homepageController");
const papersController = require("./controllers/papersController");
const testingController = require("./controllers/testingController");
const questionsController = require("./controllers/questionsController");

const mongoURI = process.env.MONGO_URL 
const dbConnection = mongoose.connection;

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

dbConnection.on("connected", () => console.log("My database is connected"));
dbConnection.on("error", (err) => console.log(`Got error! ${err.message}`));
dbConnection.on("disconnected", () => console.log("My database is disconnected"));

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"));

app.use(homepageController);
app.use("/questions", questionsController);
app.use("/papers", papersController);
app.use("/testing", testingController);

const server = app.listen(process.env.PORT);

process.on("SIGTERM", () => {
  console.log("My process is exiting");
  server.close(() => {
    dbConnection.close();
  });
});