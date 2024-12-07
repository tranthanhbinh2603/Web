import { Request, Response } from "express";
import { validationResult } from "express-validator";

const createUser = (req: Request, res: Response): any => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		const data = result.array().map((item: any) => ({
			message: item.msg,
			path: item.path,
		}));
		return res.status(400).json({
			message: data,
		});
	}
	return res.status(200).json({
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

//   app.post('/signup', validate([
//     body('email').isEmail(),
//     body('password').isLength({ min: 6 })
//   ]), async (req, res, next) => {
//     // request is guaranteed to not have any validation errors.
//     const user = await User.create({ ... });
//   });
