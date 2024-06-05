const express = require("express");
const router = express.Router();
const Campground = require("../models/campgrounds");
const { CampgroundSchema } = require("../models/schema");

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

const validateCampground = (req, res, next) => {
	const { error } = CampgroundSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

router.get(
	"/campgrounds",
	wrapAsync(async (req, res) => {
		const campgrounds = await Campground.find({});
		res.render("./campground/campgrounds", { campgrounds });
	})
);

router.post(
	"/campground",
	validateCampground,
	wrapAsync(async (req, res) => {
		const data = new Campground(req.body);
		await data.save();
		req.flash("success", "Successfully made a new campground!");
		res.redirect(`/campground/${data._id}`);
	})
);

router.get("/campground/new", (req, res) => {
	res.render("./campground/addCampground");
});

router.get(
	"/campground/:id",
	wrapAsync(async (req, res) => {
		const campground = await Campground.findById(req.params.id).populate(
			"reviews"
		);
		let isHaveReview = false;
		if (campground.reviews.length) {
			res.render("./campground/campground", {
				campground,
				isHaveReview: true,
			});
		} else {
			res.render("./campground/campground", { campground, isHaveReview });
		}
	})
);

router.get(
	"/campground/:id/edit",
	wrapAsync(async (req, res) => {
		const campground = await Campground.findById(req.params.id);
		res.render("./campground/editCampground", { campground });
	})
);

router.put(
	"/campground/:id",
	wrapAsync(async (req, res) => {
		const campground = await Campground.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ runValidators: true, new: true }
		);
		req.flash("success", "Successfully change info the campground!");
		res.redirect(`/campground/${campground._id}`);
	})
);

router.delete(
	"/campground/:id",
	wrapAsync(async (req, res) => {
		const campground = await Campground.findByIdAndDelete(req.params.id);
		req.flash("success", "Successfully delete a campground!");
		res.redirect(`/campgrounds`);
	})
);

module.exports = router;
