import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { DatabaseConnectionError } from "../error/database-connection-error";
import { RequestValidationError } from "../error/request-validation-error";
import { User } from "../model/user";
import { UserExistError } from "../error/user-exist-error";

const createUser = async (req: Request, res: Response): Promise<any> => {
	try {
		const { email, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw new UserExistError();
		}
		const result = validationResult(req);
		if (!result.isEmpty()) {
			throw new RequestValidationError(result.array());
		}
		const newUser = new User({ email, password });
		await newUser.save();
		return res.status(200).json({
			msg: "successful",
		});
	} catch (error) {
		const result = validationResult(req);
		if (error instanceof UserExistError) {
			throw new UserExistError("Email is use");
		} else if (!result.isEmpty()) {
			throw new RequestValidationError(result.array());
		} else {
			throw new DatabaseConnectionError();
		}
	}
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
