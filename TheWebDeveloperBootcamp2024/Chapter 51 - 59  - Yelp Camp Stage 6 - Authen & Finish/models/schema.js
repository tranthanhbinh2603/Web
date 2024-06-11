//Đoạn code này giúp chống lỗi XSS, chính vì vậy nên mới cần schema trong JOY :>
//Install: npm i sanitize-html
//How to use: Joi.string().escapeHTML(); //Đoạn .escapeHTML() là đoạn quan trọng nhất
const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
	type: "string",
	base: joi.string(),
	messages: {
		"string.escapeHTML": "{{#label}} must not include HTML!",
	},
	rules: {
		escapeHTML: {
			validate(value, helpers) {
				const clean = sanitizeHtml(value, {
					allowedTags: [],
					allowedAttributes: {},
				});
				return clean;
			},
		},
	},
});
const Joi = BaseJoi.extend(extension);

module.exports.CampgroundSchema = Joi.object({
	title: Joi.string().required().escapeHTML(),
	price: Joi.number().required().min(0),
	location: Joi.string().required().escapeHTML(),
	description: Joi.string().required().escapeHTML(),
});
module.exports.ReviewSchema = Joi.object({
	score: Joi.string().required().escapeHTML(),
	review: Joi.string().required().escapeHTML(),
});
