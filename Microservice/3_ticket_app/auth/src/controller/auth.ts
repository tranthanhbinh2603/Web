import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../model/user";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UserExistError } from "../error/user-exist-error";
import { DatabaseConnectionError } from "../error/database-connection-error";
import { RequestValidationError } from "../error/request-validation-error";

dotenv.config();

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
		const payload = {
			email: email,
		};
		const expiresIn = "15s";
		const jwtToken = jwt.sign(payload, process.env.JWT_KEY as string, {
			algorithm: "HS256",
			expiresIn,
		});
		req.session = {
			jwt: jwtToken,
		};
		return res.status(200).json({
			msg: "successful",
		});
	} catch (error) {
		const result = validationResult(req);
		if (error instanceof UserExistError) {
			throw new UserExistError("Email is used");
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
