const express = require("express");
const { getPosts, addPosts } = require("../controller/posts");
const router = express.Router();

router.get("/", getPosts);
router.post("/create", addPosts);

module.exports = router;
