const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const campgroundRoute = require("./routes/campground");
const reviewRoute = require("./routes/review");
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname) + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const session = require("express-session");

app.use(
	session({
		secret: "YelpCampSecretKey",
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			expires: Date.now() + 1000 * 60 * 24 * 24 * 7,
			maxAge: 1000 * 60 * 24 * 24 * 7,
		},
	})
);

app.use(flash());

app.use((req, res, next) => {
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

app.use("/", campgroundRoute);
app.use("/campground/:id/review", reviewRoute);

app.use((req, res) => {
	res.status(404).send("Something not good.");
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
	res.status(status).render("./error", { err });
});

app.listen(5050, () => {
	console.log("Finish start server");
	console.log("===========================");
});
