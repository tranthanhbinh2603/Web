const express = require("express");
const app = express();
const session = require("express-session");

app.use(
	session({
		secret: "this is a secret",
		resave: false,
		saveUninitialized: false,
	})
);

app.get("/getview", (req, res) => {
	if (req.session.count) {
		req.session.count += 1;
	} else {
		req.session.count = 1;
	}
	res.send(`You visit this page ${req.session.count} times`);
});

app.use((req, res) => {
	res.status(404).send("Wrong path!!!!");
});

app.listen(5050, () => {
	console.log("Finish start server");
	console.log("===========================");
});
