const express = require("express");
const {
	addPerson,
	exportPersons,
	exportOnePeople,
	editPeople,
} = require("../controller/controller");
const router = express.Router();

router.post("/", addPerson);
router.get("/", exportPersons);
router.get("/:id", exportOnePeople);
router.post("/:id", editPeople);

module.exports = router;
