const express = require("express");
const { getComments, addComment } = require("../controller/comment");
const router = express.Router();

router.get("/", getComments);
router.post("/", addComment);

module.exports = router;

// How to use:
// const <name variable> = require("<Your path to this file");
// app.use("/rootPath", <name variable>);
