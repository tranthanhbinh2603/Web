const express = require("express");
const router = express.Router();

// Write normal, but replace "router" word to "app"

router.get("/", (req, res) => {
	res.send("Hello World");
});

module.exports = router;

// How to use:
// const <name variable> = require("<Your path to this file");
// app.use("/rootPath", <name variable>);
