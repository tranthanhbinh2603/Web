const mongoose = require("mongoose");
const Product = require("./product");
const Schema = mongoose.Schema;
const farmSchema = new Schema({
	name: String,
	address: String,
	email: String,
	products: [
		{
			type: Schema.Types.ObjectID,
			ref: "Shop",
		},
	],
});
farmSchema.post("findOneAndDelete", async function (farm) {
	if (farm.products.length) {
		const res = await Product.deleteMany({ _id: { $in: farm.products } });
	}
});
const Farm = mongoose.model("Farm", farmSchema);
module.exports = Farm;
