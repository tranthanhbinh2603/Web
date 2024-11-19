const express = require("express");
const {
	addPerson,
	exportPersons,
	exportOnePeople,
	editPeople,
	deletePeople,
} = require("../controller/User");
const router = express.Router();

router.post("/", addPerson);
router.get("/", exportPersons);
router.get("/:id", exportOnePeople);
router.post("/:id", editPeople);
router.post("/:id/delete", deletePeople);

module.exports = router;
