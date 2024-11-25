const express = require("express");
const { getComments, addComment } = require("../controller/comment");
const router = express.Router();

// Write normal, but replace "router" word to "app"

router.get("/:id/comment", getComments);

router.post("/:id/comment", addComment);

module.exports = router;
