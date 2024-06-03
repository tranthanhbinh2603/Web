const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");
const Campground = require("./models/campgrounds");
const Review = require("./models/review");
const { CampgroundSchema, ReviewSchema } = require("./models/schema");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname) + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

const validateReview = (req, res, next) => {
	const { error } = ReviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

app.get(
	"/campgrounds",
	wrapAsync(async (req, res) => {
		const campgrounds = await Campground.find({});
		res.render("campground/campgrounds", { campgrounds });
	})
);

app.post(
	"/campground",
	validateCampground,
	wrapAsync(async (req, res) => {
		const data = new Campground(req.body);
		await data.save();
		res.redirect(`/campground/${data._id}`);
	})
);

app.get("/campground/new", (req, res) => {
	res.render("campground/addCampground");
});

app.get(
	"/campground/:id",
	wrapAsync(async (req, res) => {
		const campground = await Campground.findById(req.params.id).populate(
			"reviews"
		);
		let isHaveReview = false;
		if (campground.reviews.length) {
			res.render("campground/campground", { campground, isHaveReview: true });
		} else {
			res.render("campground/campground", { campground, isHaveReview });
		}
	})
);

app.get(
	"/campground/:id/edit",
	wrapAsync(async (req, res) => {
		const campground = await Campground.findById(req.params.id);
		res.render("campground/editCampground", { campground });
	})
);

app.put(
	"/campground/:id",
	wrapAsync(async (req, res) => {
		const campground = await Campground.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ runValidators: true, new: true }
		);
		res.redirect(`/campground/${campground._id}`);
	})
);

app.delete(
	"/campground/:id",
	wrapAsync(async (req, res) => {
		const campground = await Campground.findByIdAndDelete(req.params.id);
		res.redirect(`/campgrounds`);
	})
);

app.post(
	"/campground/:id/review",
	validateReview,
	wrapAsync(async (req, res) => {
		const { id } = req.params;
		const review = new Review(req.body);
		const campground = await Campground.findById(id);
		campground.reviews.push(review);
		await review.save();
		await campground.save();
		res.redirect(`/campground/${id}`);
	})
);

app.delete(
	"/campground/:id/review/:idReview",
	wrapAsync(async (req, res) => {
		const { id, idReview } = req.params;
		await Campground.findByIdAndUpdate(id, {
			$pull: { reviews: idReview },
		});
		await Review.findByIdAndDelete(idReview);
		res.redirect(`/campground/${id}`);
	})
);

app.get(
	"/campground/:id/review/:idReview/edit",
	wrapAsync(async (req, res) => {
		const { id, idReview } = req.params;
		const campground = await Campground.findById(id);
		const review = await Review.findById(idReview);
		res.render("review/editReview", { campground, review });
	})
);

app.put(
	"/campground/:id/review/:idReview",
	wrapAsync(async (req, res) => {
		const { id, idReview } = req.params;
		const review = await Review.findByIdAndUpdate(idReview, req.body, {
			runValidators: true,
			new: true,
		});
		res.redirect(`/campground/${id}`);
	})
);

app.use((req, res) => {
	res.status(404).render("");
});

app.use((err, req, res, next) => {
	const { status = 500, message = "Something Went Wrong" } = err;
	console.log("ERROR FOUND!");
	console.log("URL Client Request:", req.ip);
	console.log("Method:", req.method);
	console.log("Url:", req.originalUrl);
	console.log("Status:", res.statusCode);
	console.log("Res:", res.getHeader("Content-Length"));
	console.log("Response time:", res.getHeader("X-Response-Time"));
	console.log("User-agent:", req.get("User-Agent"));
	console.log("Error: ", err);
	console.log("===========================");
	res.status(status).render("./error", { err });
});

app.listen(5050, () => {
	console.log("Finish start server");
	console.log("===========================");
});
