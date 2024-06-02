const mongoose = require("mongoose");
mongoose
	.connect("mongodb://127.0.0.1:27017/SQLRelationship")
	.then(() => {
		console.log("Connect Successful!");
	})
	.catch((e) => {
		console.log("Error when connect");
		console.log(`This is error: e`);
	});

const Schema = mongoose.Schema;

const categorySchema = new Schema({
	name: String,
	price: Number,
});
const Category = mongoose.model("category", categorySchema);
// Category.insertMany([
// 	{ name: "Office", price: 1200000 },
// 	{ name: "Windows", price: 2000000 },
// ]);

const userSchema = new Schema({
	name: String,
	products: [
		{
			type: Schema.Types.ObjectID,
			ref: "Category",
		},
	],
});
const User = mongoose.model("user", userSchema);
const u1 = new User({
	name: "Tran Thanh Binh",
});
const u2 = new User({
	name: "Tran Thanh Phuc",
});
const createUsers = async () => {
	const windowCategory = await Category.findOne({ name: "Windows" });
	const officeCategory = await Category.findOne({ name: "Office" });
	u1.products.push(windowCategory);
	u2.products.push(officeCategory);
	u2.products.push(windowCategory);
	u1.save();
	u2.save();
};

createUsers();
