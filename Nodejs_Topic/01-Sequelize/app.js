const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const helmet = require("helmet");
const flash = require("connect-flash");
const sequelize = require("./database/database");
const route = require("./route/route");

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

// app.use(flash());

app.use((req, res, next) => {
	// res.locals.currentUser = req.user; //If you want to use user currenting data in EJS, you uncomment it
	// res.locals.success = req.flash("success");
	// res.locals.error = req.flash("error");
	//How to use:
	//req.flash("success", "Success Message"); or req.flash("error", "Success Message");
	//Put in after you redirect or send.
	next();
});

// =====================================

// CONNECT DATABASE HERE

const connectDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
		await sequelize.sync();
		console.log("Models synchronized with database.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

connectDatabase();

// YOUR REDIRECT MIDDLEWARE HERE (Example if the path is not define method....)

// YOUR MAIN REDIRECT HERE
app.use("/user", route);

// YOUR CATCH IN DATABASE MONGO HERE

// =====================================

app.use((req, res) => {
	return res.status(404).json({});
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
