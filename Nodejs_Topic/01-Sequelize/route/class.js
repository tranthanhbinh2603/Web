const express = require("express");
const { addClass } = require("../controller/ClassList");
const router = express.Router();

router.post("/", addClass);

module.exports = router;
