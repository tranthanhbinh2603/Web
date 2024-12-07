import { Request, Response } from "express";
import { validationResult } from "express-validator";

const createUser = (req: Request, res: Response): any => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		const data = result.array().map((item: any) => ({
			message: item.msg,
			path: item.path,
		}));
		return res.status(400).json(data);
	}
	throw new Error("Error connect database");
	return res.status(200).json({
		msg: "successful",
	});
};

const signInUser = (_req: Request, res: Response): any => {
	return res.status(200).json({
		msg: "successful",
	});
};

const signOutUser = (_req: Request, res: Response): any => {
	return res.status(200).json({
		msg: "successful",
	});
};

const getUserInfo = (_req: Request, res: Response): any => {
	return res.status(200).json({
		msg: "successful",
	});
};

export { getUserInfo, createUser, signInUser, signOutUser };
