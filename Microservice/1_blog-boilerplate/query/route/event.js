const express = require("express");
const { receiveEvent } = require("../controller/event");
const router = express.Router();

router.post("/", receiveEvent);

module.exports = router;
