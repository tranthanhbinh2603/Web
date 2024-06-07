const Campground = require("../models/campgrounds");
const Review = require("../models/review");

module.exports.addReview = async (req, res) => {
	const { id } = req.params;
	const review = new Review(req.body);
	review.name = req.user._id;
	const campground = await Campground.findById(id);
	campground.reviews.push(review);
	await review.save();
	await campground.save();
	req.flash("success", "Successfully add a new review!");
	res.redirect(`/campground/${id}`);
};

module.exports.deleteReview = async (req, res) => {
	const { id, idReview } = req.params;
	await Campground.findByIdAndUpdate(id, {
		$pull: { reviews: idReview },
	});
	await Review.findByIdAndDelete(idReview);
	req.flash("success", "Successfully delete a review!");
	res.redirect(`/campground/${id}`);
};

module.exports.exportReviewEditForm = async (req, res) => {
	const { id, idReview } = req.params;
	const campground = await Campground.findById(id);
	const review = await Review.findById(idReview);
	res.render("./review/editReview", { campground, review });
};

module.exports.editReview = async (req, res) => {
	const { id, idReview } = req.params;
	const review = await Review.findByIdAndUpdate(idReview, req.body, {
		runValidators: true,
		new: true,
	});
	req.flash("success", "Successfully edit a review!");
	res.redirect(`/campground/${id}`);
};
