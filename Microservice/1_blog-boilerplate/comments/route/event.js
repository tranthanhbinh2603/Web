const express = require("express");
const { receiveEvent } = require("../controller/event");
const router = express.Router();

// Write normal, but replace "router" word to "app"

router.post("/", receiveEvent);

module.exports = router;
