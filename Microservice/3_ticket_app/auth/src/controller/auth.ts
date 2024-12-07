import { Request, Response } from "express";

const createUser = (_req: Request, res: Response) => {
	res.status(200).json({
		message: "successful",
	});
};

const signInUser = (_req: Request, res: Response) => {
	res.status(200).json({
		message: "successful",
	});
};

const signOutUser = (_req: Request, res: Response) => {
	res.status(200).json({
		message: "successful",
	});
};

const getUserInfo = (_req: Request, res: Response) => {
	res.status(200).json({
		message: "successful",
	});
};

export { getUserInfo, createUser, signInUser, signOutUser };
