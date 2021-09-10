const express = require("express");
const papersModel = require("../models/papers");
const controller = express.Router();

const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
})

const uploadMiddleware = multer({ storage: diskStorage });

controller.use(uploadMiddleware.single("featuredImage"));

controller.get("/new", (req, res) => {
  res.render("posts/new.ejs");
});

controller.get("/:id", async (req, res) => {
  const selectedPaper = await PapersModel.findById(req.params.id);
  const success = req.query.success;
  const action = req.query.action;
  res.render("papers/show.ejs", {
    post: selectedPaper,
    success,
    action
  });
});

controller.post("/", async (req, res) => {
  const inputs = {
    title: req.body.title,
    questionImage: `images/${req.file.filename}`,
    author: req.body.author,
    publishedDate: new Date(req.body.publishedDate),
    // content: req.body.content ==> figure out how to add questions
  }
  await papersModel.create(inputs);
  res.redirect("/?success=true&action=create");
});

controller.get("/:id/edit", async (req, res) => {
  const selectedPaper = await papersModel.findById(req.params.id);
  res.render('papers/edit.ejs', {
    papers: selectedPaper,
  });
});

controller.put("/:id", async (req, res) => {
  const inputs = {
    title: req.body.title,
    featuredImage: `images/${req.file.filename}`,
    author: req.body.author,
    publishedDate: new Date(req.body.publishedDate),
  }
  await papersModel.updateOne({
    _id: req.params.id,
  }, inputs);

  res.redirect(`/papers/${req.params.id}?success=true&action=update`);
});

controller.delete("/:id", async (req, res) => {
  await papersModel.deleteOne({
    _id: req.params.id
  });

  res.redirect("/?success=true&action=delete");
});

module.exports = controller;