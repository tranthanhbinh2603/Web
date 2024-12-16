import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
	id: string;
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

export const getCurrentUser = (
	req: Request,
	_res: Response,
	next: NextFunction
): any => {
	if (!req.session?.jwt) {
		return next();
	}
	try {
		const payload = jwt.verify(
			req.session.jwt,
			process.env.JWT_KEY!
		) as UserPayload;
		const { iat, exp, ...dataUser } = payload as {
			[key: string]: any;
		};
		req.currentUser = dataUser as UserPayload;
	} catch (err) {}

	next();
};
