const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const helmet = require("helmet");
const flash = require("connect-flash");
const mainRoute = require("./route/main");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname) + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(helmet({ contentSecurityPolicy: false }));

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

app.use(flash());

app.use((req, res, next) => {
	next();
});

// =====================================

// CONNECT DATABASE HERE

// YOUR REDIRECT MIDDLEWARE HERE (Example if the path is not define method....)

// YOUR MAIN REDIRECT HERE

app.use("/", mainRoute);

// YOUR CATCH IN DATABASE MONGO HERE

// =====================================

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
