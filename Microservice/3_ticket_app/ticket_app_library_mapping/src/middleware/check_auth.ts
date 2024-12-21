import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../../../ticket_app_library/src/errors/not-authorized-error";

export const checkAuth = (
	req: Request,
	_res: Response,
	next: NextFunction
): any => {
	if (!req.currentUser) {
		throw new NotAuthorizedError();
	}

	next();
};
