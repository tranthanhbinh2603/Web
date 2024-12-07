import { Request, Response, NextFunction } from "express";

const red = "\x1b[31m";
// const green = '\x1b[32m';
// const yellow = '\x1b[33m';
const reset = "\x1b[0m";

class AppError extends Error {
	status: number;
	message: string;

	constructor(message: string, status: number) {
		super(message);
		this.status = status;
		this.message = message;
		Object.setPrototypeOf(this, AppError.prototype);
	}
}

// function wrapAsync(
// 	fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
// ) {
// 	return (req: Request, res: Response, next: NextFunction) => {
// 		fn(req, res, next).catch((e: Error) => next(e));
// 	};
// }

const errorHandler = (
	err: AppError,
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	const { status = 500, message = "Something Went Wrong" } = err;
	console.log(`${red}ERROR FOUND!${reset}`);
	console.log("URL Client Request:", req.ip);
	console.log("Method:", req.method);
	console.log("Url:", req.originalUrl);
	console.log("Message: ", message);
	console.log("Status:", res.statusCode);
	console.log("Res:", res.getHeader("Content-Length"));
	console.log("Response time:", res.getHeader("X-Response-Time"));
	console.log("User-agent:", req.get("User-Agent"));
	console.log(err);
	console.log("===========================");
	res.status(status).json([
		{
			msg: "Something went wrong",
		},
	]);
};

export { errorHandler };
