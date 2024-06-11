const mongoose = require("mongoose");
const Campground = require("../models/campgrounds");
const cities = require("../seeds/cities");
const { places, descriptors } = require("../seeds/helper");
mongoose
	.connect("mongodb://127.0.0.1:27017/yelpCampDB")
	.then(() => {})
	.catch((e) => {
		console.log("Error when connect");
		console.log(`This is error: e`);
	});

const randomInArray = (array) =>
	array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	// for (let i = 0; i < 5; i++) {
	// 	randomCity = randomInArray(cities);
	// 	randomPlace = `${randomInArray(descriptors)} ${randomInArray(places)}`;
	// 	const data = new Campground({
	// 		location: `${randomCity.city}, ${randomCity.state}`,
	// 		title: randomPlace,
	// 		description:
	// 			"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et",
	// 		price: `${Math.floor(Math.random() * (20 - 10 + 1)) + 10}.${
	// 			Math.floor(Math.random() * (99 - 0 + 1)) + 0
	// 		}`,
	// 		image: `https://picsum.photos/id/${i}/200`,
	// 		user: "6661c144f04bcc55ebbc32f7",
	// 	});
	// 	await data.save();
	// }
	console.log("Generate Done.");
};

seedDB();
