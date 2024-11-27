const express = require("express");
const { setEvent } = require("../controller/event");
const router = express.Router();

// Write normal, but replace "router" word to "app"

router.post("/event", setEvent);

module.exports = router;
