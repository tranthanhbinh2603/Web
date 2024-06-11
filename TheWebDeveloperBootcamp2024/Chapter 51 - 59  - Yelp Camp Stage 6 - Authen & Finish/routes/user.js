const express = require("express");
const router = express.Router();
const passport = require("passport");
const flash = require("connect-flash");
const { storeReturnTo } = require("../middleware");
const userController = require("../controllers/user.js");

router.use(flash());

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

router
	.route("/register")
	.get(wrapAsync(userController.exportRegisterForm))
	.post(wrapAsync(userController.register));

//Lưu lại hàm post để thực hiện việc login bằng username và password
router
	.route("/login")
	.get(wrapAsync(userController.exportLoginForm))
	.post(
		storeReturnTo,
		passport.authenticate("local", {
			failureFlash: true,
			failureRedirect: "/login",
		}),
		//wrapAsync(userController.login)
		userController.login
	);

router.get("/logout", userController.logout);

module.exports = router;
