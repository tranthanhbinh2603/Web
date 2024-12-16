import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../model/user";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UserExistError } from "../error/user-exist-error";
import { DatabaseConnectionError } from "../error/database-connection-error";
import { RequestValidationError } from "../error/request-validation-error";
import { BadRequestError } from "../error/bad-request-error";
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
			throw new BadRequestError();
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

const signOutUser = (_req: Request, res: Response): any => {
	return res.status(200).json({
		msg: "successful",
	});
};

const getUserInfo = (req: Request, res: Response): any => {
	try {
		if (!req.session || !req.session.jwt) {
			throw new BadRequestError(false, "You are not logged in");
		}
		let decoded;
		try {
			decoded = jwt.verify(req.session.jwt, process.env.JWT_KEY as string, {
				algorithms: ["HS256"],
			});
		} catch {
			return res.status(200).json({
				current_user: null,
			});
		}

		const { iat, exp, ...dataUser } = decoded as { [key: string]: any };
		return res.status(200).json({
			current_user: dataUser,
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			throw new BadRequestError(false, "You are not logged in.");
		} else {
			throw new BadRequestError(true);
		}
	}
};

export { getUserInfo, createUser, signInUser, signOutUser };
