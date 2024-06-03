const Review = require("../models/review");
const mongoose = require("mongoose");
mongoose
	.connect("mongodb://127.0.0.1:27017/yelpCampDB")
	.then(() => {})
	.catch((e) => {
		console.log("Error when connect");
		console.log(`This is error: e`);
	});

const Schema = mongoose.Schema;
const campgroundSchema = new Schema({
	title: String,
	price: Number,
	description: String,
	location: String,
	image: String,
	reviews: [
		{
			type: Schema.Types.ObjectID,
			ref: "Review",
		},
	],
});
campgroundSchema.post("findOneAndDelete", async function (campground) {
	if (campground.reviews.length) {
		await Review.deleteMany({ _id: { $in: campground.reviews } });
	}
});
const Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
