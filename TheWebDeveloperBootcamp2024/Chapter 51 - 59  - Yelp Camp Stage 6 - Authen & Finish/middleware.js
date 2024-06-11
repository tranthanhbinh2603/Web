const Campground = require("./models/campgrounds");
const Review = require("./models/review");

// Lưu lại đoạn code này để check permission
module.exports.storeReturnTo = (req, res, next) => {
	if (req.session.returnTo) {
		res.locals.returnTo = req.session.returnTo;
	}
	return next();
};

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.returnTo = req.originalUrl;
		req.flash("error", "You must be signed in first!");
		return res.redirect("/login");
	}
	next();
};

module.exports.isAuthor = async (req, res, next) => {
	const { id } = req.params;
	if (!req.user) {
		req.flash("error", "You do not have permission to do that!");
		return res.redirect(`/campground/${id}`);
	}
	const campground = await Campground.findById(id);
	if (!campground.user._id.equals(req.user._id)) {
		req.flash("error", "You do not have permission to do that!");
		return res.redirect(`/campground/${id}`);
	}
	next();
};

module.exports.isAuthorReview = async (req, res, next) => {
	const { id, idReview } = req.params;
	if (!req.user) {
		req.flash("error", "You do not have permission to do that!");
		return res.redirect(`/campground/${id}`);
	}
	const review = await Review.findById(idReview);
	if (!review.name._id.equals(req.user._id)) {
		req.flash("error", "You do not have permission to do that!");
		return res.redirect(`/campground/${id}`);
	}
	next();
};
