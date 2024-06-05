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

app.use("/register", (req, res) => {
	req.session.username = req.query.username;
	res.redirect("/greet");
});

app.use("/greet", (req, res) => {
	res.send(`Hello, ${req.session.username}, welcome back.`);
});

app.use((req, res) => {
	res.status(404).send("Wrong path!!!!");
});

app.listen(5050, () => {
	console.log("Finish start server");
	console.log("===========================");
});
