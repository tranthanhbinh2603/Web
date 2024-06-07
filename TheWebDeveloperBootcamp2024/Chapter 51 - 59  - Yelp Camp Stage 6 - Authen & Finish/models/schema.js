const Joi = require("joi");
module.exports.CampgroundSchema = Joi.object({
	title: Joi.string().required(),
	price: Joi.number().required().min(0),
	image: Joi.string().required(),
	location: Joi.string().required(),
	description: Joi.string().required(),
});
module.exports.ReviewSchema = Joi.object({
	score: Joi.string().required(),
	review: Joi.string().required(),
});
