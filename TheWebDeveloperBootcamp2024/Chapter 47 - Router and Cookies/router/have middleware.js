const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
	if (req.query.password !== "Hello") {
		res.send("Wrong password");
	}
	next();
});

router.get("/", (req, res) => {
	res.send("View All");
});

router.get("/:id", (req, res) => {
	res.send("View One");
});

router.get("/:id/edit", (req, res) => {
	res.send("Edit one");
});

module.exports = router;
