const { Post, validate } = require("../models/post.js");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

// Get Request
router.get("/", async (req, res) => {
  const posts = await Post.find().sort("-date_posted");
  res.status(200).send(posts);
});

// Post Request
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = new Post(
    _.pick(req.body, ["id", "title", "description", "image"])
  );
  post.save();
  res.status(200).send(post);
});
module.exports = router;
