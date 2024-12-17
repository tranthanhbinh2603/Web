import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

const red = "\x1b[31m";
// const green = '\x1b[32m';
// const yellow = '\x1b[33m';
const reset = "\x1b[0m";

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	_next: NextFunction
): any => {
	if (err instanceof CustomError) {
		if (err.printLog) {
			console.log(`${red}ERROR FOUND!${reset}`);
			console.log("URL Client Request:", req.ip);
			console.log("Method:", req.method);
			console.log("Url:", req.originalUrl);
			console.log("Message:", err.serializeErrors());
			console.log("Status:", res.statusCode);
			console.log("Res:", res.getHeader("Content-Length"));
			console.log("Response time:", res.getHeader("X-Response-Time"));
			console.log("User-agent:", req.get("User-Agent"));
			console.log("===========================");
		}
		return res.status(err.statusCode).send({ errors: err.serializeErrors() });
	}

	res.status(500).send({
		errors: [{ msg: "Something went wrong" }],
	});
};

export { errorHandler };
