const express = require("express");
const { getPosts } = require("../controller/post");
const router = express.Router();

router.get("/", getPosts);

module.exports = router;

// How to use:
// const <name variable> = require("<Your path to this file");
// app.use("/rootPath", <name variable>);
