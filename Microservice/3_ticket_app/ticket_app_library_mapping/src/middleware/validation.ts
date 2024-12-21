import { body } from "express-validator";

export const validateRegisterUser = [
	body("email").isEmail().withMessage("Please provide a valid email address"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters"),
	body("password")
		.isLength({ max: 20 })
		.withMessage("Password must not exceed 20 characters"),
];

export const validateLoginUser = [
	body("email").isEmail().withMessage("Please provide a valid email address"),
];
