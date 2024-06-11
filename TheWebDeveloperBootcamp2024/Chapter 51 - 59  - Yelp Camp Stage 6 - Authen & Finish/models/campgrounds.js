const Review = require("../models/review");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const imageSchema = new Schema({
	url: String,
	filename: String,
});
//Chổ này lưu lại vì nó sẽ liên quan đến hàm vitural (sửa lại snippet)
// Using in html/css: Img.thumbnail
imageSchema.virtual("thumbnail").get(function () {
	return this.url.replace("/upload", "/upload/w_500");
});
const campgroundSchema = new Schema({
	title: String,
	price: Number,
	description: String,
	location: String,
	user: {
		type: Schema.Types.ObjectID,
		ref: "User",
	},
	reviews: [
		{
			type: Schema.Types.ObjectID,
			ref: "Review",
		},
	],
	image: [imageSchema],
});
campgroundSchema.post("findOneAndDelete", async function (campground) {
	if (campground.reviews.length) {
		await Review.deleteMany({ _id: { $in: campground.reviews } });
	}
});
const Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
