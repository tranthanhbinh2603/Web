const express = require("express");
const router = express.Router();
const { CampgroundSchema } = require("../models/schema");
const { isLoggedIn, isAuthor } = require("../middleware");
const campgroundController = require("../controllers/campground");
var multer = require("multer");
const { storage } = require("../cloudinary/index");

class AppError extends Error {
	constructor(message, status) {
		super();
		this.message = message;
		this.status = status;
	}
}

var upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		const maxFiles = 5;
		if (req.files.length > maxFiles) {
			return cb(new AppError(`The limit of photos is ${maxFiles}`, 413));
		}
		cb(null, true);
	},
});

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
	.put(
		isLoggedIn,
		isAuthor,
		upload.array("image"),
		wrapAsync(campgroundController.editCampground)
	)
	.delete(
		isLoggedIn,
		isAuthor,
		wrapAsync(campgroundController.deleteCampground)
	);

router.get("/campgrounds", wrapAsync(campgroundController.exportCampgrounds));

// Lưu trữ lại cách giữ file và lưu file lên đám mây
// Nhớ thêm enctype="multipart/form-data" vào trước form
router.post(
	"/campground",
	isLoggedIn,
	upload.array("image"), //Nếu như là 1 file (chổ thẻ input file không có chữ multiple) thì là upload.single('image'), và để lấy file là file chứ không phải files
	validateCampground,
	wrapAsync(campgroundController.addCampground)
);

module.exports = router;
