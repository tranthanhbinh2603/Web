const User = require("../models/user");

//Các đoạn code này cũng phải lưu để thực hiện quy trình đăng nhập bằng cách dùng username-password thường
module.exports.register = async (req, res) => {
	try {
		const { username, password, email } = req.body;
		const user = new User({ username, email });
		const data = await User.register(user, password);
		req.login(data, (err) => {
			if (err) return next(err);
			req.flash("success", "Welcome to Yelp Camp");
			res.redirect("/campgrounds");
		});
	} catch (e) {
		req.flash("error", e.message);
		res.redirect("register");
	}
};

module.exports.exportRegisterForm = async (req, res) => {
	res.render("./user/register");
};

module.exports.exportLoginForm = async (req, res) => {
	res.render("user/login");
};

module.exports.login = (req, res) => {
	try {
		req.flash("success", "Welcome back!");
		const redirectUrl = res.locals.returnTo || "/campgrounds";
		delete req.session.returnTo;
		return res.redirect(redirectUrl);
	} catch (e) {
		req.flash("error", e.message);
		res.redirect("/login");
	}
};

module.exports.logout = (req, res) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		req.flash("success", "Goodbye!");
		res.redirect("/campgrounds");
	});
};
