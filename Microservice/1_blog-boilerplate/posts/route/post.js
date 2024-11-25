const express = require("express");
const { getPosts, addPosts } = require("../controller/posts");
const router = express.Router();

// Write normal, but replace "router" word to "app"

router.get("/", getPosts);
router.post("/", addPosts);

module.exports = router;

// How to use:
