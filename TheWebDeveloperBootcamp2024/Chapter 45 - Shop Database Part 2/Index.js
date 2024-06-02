const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");
const Product = require("./models/product.js");
const Farm = require("./models/farm.js");
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname) + "/views");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const { default: mongoose } = require("mongoose");
const mongo = require("mongoose");

categories = ["vegetable", "fruit", "dairy"];

app.put("/farm/:idFarm/product/:idProduct", async (req, res) => {
	//Cấu trúc phải lưu
	const { idFarm, idProduct } = req.params;
	const product = await Product.findByIdAndUpdate(idProduct, req.body, {
		runValidators: true,
		new: true,
	});
	res.redirect(`/farm/${idFarm}/product/${idProduct}`);
});

app.delete("/farm/:idFarm/product/:idProduct", async (req, res) => {
	//Cấu trúc phải lưu
	const { idFarm, idProduct } = req.params;
	await Product.findByIdAndDelete(idProduct);
	res.redirect(`/farm/${idFarm}/products`);
});

app.post("/farm/:id/product", async (req, res) => {
	//Cấu trúc phải lưu
	const product = new Product(req.body);
	const farm = await Farm.findById(req.params.id);
	product.farm = farm;
	farm.products.push(product);
	await product.save();
	await farm.save();
	res.redirect(`/farm/${farm.id}/product/${product.id}`);
});

app.get("/farm/:id/products", async (req, res) => {
	let { category } = req.query;
	let { id } = req.params;
	if (!category) {
		let listProduct = await Farm.findById(id).populate("products");
		res.render("products", { listProduct, categories: "All" });
	} else {
		let listProduct = await Farm.findById(id).populate({
			path: "products",
			match: { category: category },
		});
		res.render("products", { listProduct, categories });
	}
});

app.get("/farm/:id/product/new", (req, res) => {
	res.render("addProduct", { categories });
});

app.get("/farm/:idFarm/product/:idProduct", async (req, res) => {
	//Cấu trúc phải lưu
	const { idFarm, idProduct } = req.params;
	let productWithID = await Product.findById(idProduct);
	res.render("product", { productWithID });
});

app.get("/farm/:idFarm/product/:idProduct/edit", async (req, res) => {
	//Cấu trúc phải lưu
	const { idProduct } = req.params;
	let productWithID = await Product.findById(idProduct);
	res.render("editProduct", { productWithID });
});

app.get("/farms", async (req, res) => {
	let farms = await Farm.find({});
	res.render("farms", { farms });
});

app.get("/farm/add", async (req, res) => {
	res.render("addFarm");
});

app.post("/farm", async (req, res) => {
	const newFarm = new Farm(req.body);
	newFarm.save();
	res.redirect("/farms");
});

app.get("/farm/:id", async (req, res) => {
	const { id } = req.params;
	let farm = await Farm.findById(id);
	res.render("farm", { farm });
});

app.get("/farm/:id/edit", async (req, res) => {
	const { id } = req.params;
	let farm = await Farm.findById(id);
	res.render("editFarm", { farm });
});

app.put("/farm/:id", async (req, res) => {
	const { id } = req.params;
	await Farm.findByIdAndUpdate(id, req.body, {
		runValidators: true,
		new: true,
	});
	res.redirect("/farms");
});

app.delete("/farm/:id", async (req, res) => {
	const { id } = req.params;
	await Farm.findByIdAndDelete(id, req.body);
	res.redirect("/farms");
});

app.get("*", (req, res) => {
	res.send("404, you go to wrong page.");
});

app.listen(5050, () => {});
