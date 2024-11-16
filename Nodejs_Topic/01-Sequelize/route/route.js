const express = require("express");
const {
	addPerson,
	exportPersons,
	exportOnePeople,
} = require("../controller/controller");
const router = express.Router();

router.post("/", addPerson);
router.get("/", exportPersons);
router.post("/:id", exportOnePeople);

module.exports = router;
