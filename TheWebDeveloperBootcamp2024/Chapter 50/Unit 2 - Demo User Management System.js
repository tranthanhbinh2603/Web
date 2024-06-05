const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname) + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
const session = require("express-session");
app.use(
	session({
		secret: "LoginSecretKey",
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			expires: Date.now() + 1000 * 60 * 24 * 24 * 7,
			maxAge: 1000 * 60 * 24 * 24 * 7,
		},
	})
);

mongoose
	.connect("mongodb://127.0.0.1:27017/demoUserManagement")
	.then(() => {
		console.log("Connect Successful!");
	})
	.catch((e) => {
		console.log("Error when connect");
		console.log(`This is error: e`);
	});

const User = require("./models/user");

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

// CONNECT DATABASE HERE

// YOUR REDIRECT MIDDLEWARE HERE (Example if the path is not define method....)

const verifyAccount = async (req, res, next) => {
	if (!req.session.user_id) {
		return res.redirect("/login");
	}
	next();
};

// YOUR MAIN MIDDLE WARE HERE

app.get(
	"/secret",
	verifyAccount,
	wrapAsync(async (req, res) => {
		res.render("secret");
	})
);

app.get(
	"/register",
	wrapAsync(async (req, res) => {
		res.render("register");
	})
);

app.post(
	"/register",
	wrapAsync(async (req, res) => {
		const { username, password } = req.body;
		const u = new User({
			username,
			password,
		});
		await u.save();
		res.send("Successful register");
	})
);

app.get(
	"/login",
	wrapAsync(async (req, res) => {
		if (req.session.user_id) {
			return res.redirect("/secret");
		}
		res.render("login");
	})
);

app.post(
	"/login",
	wrapAsync(async (req, res) => {
		if (req.session.user_id) {
			res.redirect("/secret");
		} else {
			const { username, password } = req.body;
			const userAccount = await User.findAndValidate(username, password);
			console.log(userAccount);
			if (userAccount) {
				//res.send("Successful Login.");
				req.session.user_id = userAccount._id;
				res.redirect("/secret");
			} else {
				// res.send("Login failed.");
				res.redirect("/login");
			}
		}
	})
);

app.post(
	"/logout",
	wrapAsync(async (req, res) => {
		req.session.destroy();
		res.redirect("/login");
	})
);

// YOUR CATCH IN DATABASE MONGO HERE

// =====================================

app.use((req, res) => {
	res.status(404).render("You go wrong......");
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
