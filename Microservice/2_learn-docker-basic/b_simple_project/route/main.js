const express = require("express");
const { getData, addData } = require("../controller/main");
const router = express.Router();

// Write normal, but replace "router" word to "app"

router.get("/", getData);
router.post("/", addData);

module.exports = router;

// How to use:
