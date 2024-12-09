import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { DatabaseConnectionError } from "../error/database-connection-error";
import { RequestValidationError } from "../error/request-validation-error";

const createUser = (req: Request, _res: Response): any => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		throw new RequestValidationError(result.array());
	}
	throw new DatabaseConnectionError();
	// return res.status(200).json({
	// 	msg: "successful",
	// });
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
