const express = require("express");
const router = express.Router({ mergeParams: true });
const { ReviewSchema } = require("../models/schema");
const { isAuthorReview } = require("../middleware");
const reviewController = require("../controllers/review");

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

router
	.route("/:idReview")
	.delete(isAuthorReview, wrapAsync(reviewController.deleteReview))
	.put(isAuthorReview, wrapAsync(reviewController.editReview));

router.post("/", validateReview, wrapAsync(reviewController.addReview));

router.get(
	"/:idReview/edit",
	isAuthorReview,
	wrapAsync(reviewController.exportReviewEditForm)
);

module.exports = router;
