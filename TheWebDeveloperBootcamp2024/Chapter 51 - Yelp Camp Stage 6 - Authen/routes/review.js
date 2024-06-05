const express = require("express");
const router = express.Router({ mergeParams: true });
const { ReviewSchema } = require("../models/schema");
const Campground = require("../models/campgrounds");
const Review = require("../models/review");

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

const validateReview = (req, res, next) => {
	const { error } = ReviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

router.post(
	"/",
	validateReview,
	wrapAsync(async (req, res) => {
		const { id } = req.params;
		const review = new Review(req.body);
		const campground = await Campground.findById(id);
		campground.reviews.push(review);
		await review.save();
		await campground.save();
		req.flash("success", "Successfully add a new review!");
		res.redirect(`/campground/${id}`);
	})
);

router.delete(
	"/:idReview",
	wrapAsync(async (req, res) => {
		const { id, idReview } = req.params;
		await Campground.findByIdAndUpdate(id, {
			$pull: { reviews: idReview },
		});
		await Review.findByIdAndDelete(idReview);
		req.flash("success", "Successfully delete a review!");
		res.redirect(`/campground/${id}`);
	})
);

router.get(
	"/:idReview/edit",
	wrapAsync(async (req, res) => {
		const { id, idReview } = req.params;
		const campground = await Campground.findById(id);
		const review = await Review.findById(idReview);
		res.render("./review/editReview", { campground, review });
	})
);

router.put(
	"/:idReview",
	wrapAsync(async (req, res) => {
		const { id, idReview } = req.params;
		const review = await Review.findByIdAndUpdate(idReview, req.body, {
			runValidators: true,
			new: true,
		});
		req.flash("success", "Successfully edit a review!");
		res.redirect(`/campground/${id}`);
	})
);

module.exports = router;
