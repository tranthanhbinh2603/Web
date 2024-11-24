const express = require("express");
const {
	addTask,
	getAllTasks,
	editTask,
	deleteTask,
} = require("../controller/task");
const router = express.Router();

router.get("/", getAllTasks);
router.post("/", addTask);
router.post("/:id", editTask);
router.post("/:id/delete", deleteTask);

module.exports = router;
