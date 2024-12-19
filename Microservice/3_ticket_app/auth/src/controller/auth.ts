import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../model/user";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UserExistError } from "../errors/user-exist-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../utils/password";

dotenv.config();

const createUser = async (req: Request, res: Response): Promise<any> => {
	try {
		if (!process.env.JWT_KEY) {
			throw new BadRequestError();
		}
		const { email, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw new UserExistError();
		}
		const result = validationResult(req);
		if (!result.isEmpty()) {
			throw new RequestValidationError(result.array());
		}
		const newUserData = new User({ email, password });
		await newUserData.save();
		const payload = {
			id: newUserData._id,
			email: email,
		};
		const expiresIn = "1800s";
		const jwtToken = jwt.sign(payload, process.env.JWT_KEY as string, {
			algorithm: "HS256",
			expiresIn,
		});
		req.session = {
			jwt: jwtToken,
		};
		return res.status(200).json({
			msg: "successful",
			data: newUserData,
		});
	} catch (error) {
		const result = validationResult(req);
		if (error instanceof UserExistError) {
			throw new UserExistError("Email is used");
		} else if (error instanceof BadRequestError) {
			throw new BadRequestError();
		} else if (!result.isEmpty()) {
			throw new RequestValidationError(result.array());
		} else {
			throw new DatabaseConnectionError();
		}
	}
};

const signInUser = async (req: Request, res: Response): Promise<any> => {
	try {
		if (!process.env.JWT_KEY) {
			throw new BadRequestError();
		}
		const result = validationResult(req);
		if (!result.isEmpty()) {
			throw new RequestValidationError(result.array());
		}
		const { email, password: suppliedPassword } = req.body;
		const userData = await User.findOne({ email });
		if (!userData) {
			throw new BadRequestError(false, "Wrong credential");
		}
		const storedPassword = userData.password;
		const isRightPassword = await Password.compare(
			storedPassword,
			suppliedPassword
		);
		if (!isRightPassword) {
			throw new BadRequestError();
		}
		const payload = {
			id: userData._id,
			email: email,
		};
		const expiresIn = "1800s";
		const jwtToken = jwt.sign(payload, process.env.JWT_KEY as string, {
			algorithm: "HS256",
			expiresIn,
		});
		req.session = {
			jwt: jwtToken,
		};
		return res.status(200).json({
			msg: "successful",
			data: userData,
		});
	} catch (error) {
		const result = validationResult(req);
		if (error instanceof BadRequestError) {
			throw new BadRequestError(false, "Wrong credential");
		} else if (!result.isEmpty()) {
			throw new RequestValidationError(result.array());
		} else {
			throw new DatabaseConnectionError();
		}
	}
};

const signOutUser = (req: Request, res: Response): any => {
	try {
		req.session = null;
		return res.status(200).json({
			msg: "successful",
		});
	} catch {
		throw new BadRequestError(true);
	}
};

const getUserInfo = (req: Request, res: Response): any => {
	try {
		return res.status(200).json({
			current_user: req.currentUser || null,
		});
	} catch (error) {
		throw new BadRequestError(true);
	}
};

export { getUserInfo, createUser, signInUser, signOutUser };
