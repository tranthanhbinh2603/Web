const express = require("express");
const router = express.Router();
const { CampgroundSchema } = require("../models/schema");
const { isLoggedIn, isAuthor } = require("../middleware");
const campgroundController = require("../controllers/campground");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

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
	"/campground/new",
	isLoggedIn,
	campgroundController.exportAddCampgroundForm
);

router.get(
	"/campground/:id/edit",
	isLoggedIn,
	isAuthor,
	wrapAsync(campgroundController.exportEditCampgroundForm)
);

router
	.route("/campground/:id")
	.get(wrapAsync(campgroundController.exportCampground))
	.put(isLoggedIn, isAuthor, wrapAsync(campgroundController.editCampground))
	.delete(
		isLoggedIn,
		isAuthor,
		wrapAsync(campgroundController.deleteCampground)
	);

router.get("/campgrounds", wrapAsync(campgroundController.exportCampgrounds));

// Lưu trữ lại cách giữ file và lưu file lên đám mây
router.post(
	"/campground",
	//validateCampground,
	upload.single("image"), //Nếu như là nhiều file (chổ thẻ input file có chữ multiple) thì là upload.array('image')
	// wrapAsync(campgroundController.addCampground)
	wrapAsync((req, res) => {
		console.log(req.body);
		console.log(req.file);
		res.send("finish");
	})
);

module.exports = router;
