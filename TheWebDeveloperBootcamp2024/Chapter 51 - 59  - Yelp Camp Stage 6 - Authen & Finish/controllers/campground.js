const Campground = require("../models/campgrounds");

module.exports.exportCampgrounds = async (req, res) => {
	const campgrounds = await Campground.find({});
	res.render("./campground/campgrounds", { campgrounds });
};

module.exports.addCampground = async (req, res) => {
	const data = new Campground(req.body);
	data.user = req.user._id;
	await data.save();
	req.flash("success", "Successfully made a new campground!");
	res.redirect(`/campground/${data._id}`);
};

module.exports.exportAddCampgroundForm = (req, res) => {
	res.render("./campground/addCampground");
};

module.exports.exportEditCampgroundForm = async (req, res) => {
	const campground = await Campground.findById(req.params.id);
	res.render("./campground/editCampground", { campground });
};

module.exports.exportCampground = async (req, res) => {
	const campground = await Campground.findById(req.params.id)
		.populate({
			path: "reviews",
			populate: {
				path: "name",
				model: "User",
			},
		})
		.populate("user");
	let isHaveReview = false;
	if (campground.reviews.length) {
		res.render("./campground/campground", {
			campground,
			isHaveReview: true,
		});
	} else {
		res.render("./campground/campground", { campground, isHaveReview });
	}
};

module.exports.editCampground = async (req, res) => {
	const campground = await Campground.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ runValidators: true, new: true }
	);
	req.flash("success", "Successfully change info the campground!");
	res.redirect(`/campground/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
	await Campground.findByIdAndDelete(req.params.id);
	req.flash("success", "Successfully delete a campground!");
	res.redirect(`/campgrounds`);
};
