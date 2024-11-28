const express = require("express");
const { setEvent, deleteEvents, getEvents } = require("../controller/event");
const router = express.Router();

// Write normal, but replace "router" word to "app"

router.post("/", setEvent);
router.post("/delete", deleteEvents);
router.get("/get", getEvents);

module.exports = router;
