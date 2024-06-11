//Lưu lại đoạn code này để sau này dễ dàng up ảnh lên cloudinary
//Chú ý cài thư viện 3 dòng này:
// npm install cloudinary@1.41.3
// npm install multer-storage-cloudinary@4.0.0
// npm install multer@1.4.5-lts.1

// How to use:
// const { storage } = require("../cloudinary/index");
// var upload = multer({ storage });

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
	cloud_name: process.env.CloudName,
	api_key: process.env.APIKey,
	api_secret: process.env.APISecret,
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "YelpCamp",
		allowedFormats: ["jpeg", "png", "jpg"],
	},
});

module.exports = {
	cloudinary,
	storage,
};
