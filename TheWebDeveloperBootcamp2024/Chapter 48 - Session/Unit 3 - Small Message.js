const express = require("express");
const app = express();
const path = require("path");
const flash = require("connect-flash");

const session = require("express-session");

app.use(
	session({
		secret: "this is a secret",
		resave: false,
		saveUninitialized: false,
	})
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname) + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

class AppError extends Error {
	constructor(message, status) {
		super();
		this.message = message;
		this.status = status;
	}
}

function wrapAsync(fn) {
	return function (req, res, next) {
		fn(req, res, next).catch((e) => next(e));
	};
}
app.get(
	"/login",
	wrapAsync(async (req, res) => {
		req.session.username = req.query.username;
		req.flash("success", "You can see me once time!!!!!!!");
		res.redirect("/greet");
	})
);

app.get(
	"/greet",
	wrapAsync(async (req, res) => {
		const data = req.session;
		res.render("message", { data, messages: req.flash("success") });
	})
);

app.use((req, res) => {
	res.status(404).example("");
});

app.use((err, req, res, next) => {
	const { status = 500, message = "Something Went Wrong" } = err;
	console.log("ERROR FOUND!");
	console.log("URL Client Request:", req.ip);
	console.log("Method:", req.method);
	console.log("Url:", req.originalUrl);
	console.log("Status:", res.statusCode);
	console.log("Res:", res.getHeader("Content-Length"));
	console.log("Response time:", res.getHeader("X-Response-Time"));
	console.log("User-agent:", req.get("User-Agent"));
	console.log("Error: ", err);
	console.log("===========================");
	res.status(status).send(message);
});

app.listen(5050, () => {
	console.log("Finish start server");
	console.log("===========================");
});
