import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
	statusCode = 400;

	printLog = false;

	constructor(public errors: ValidationError[]) {
		super("Invalid request parameters");
		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}

	serializeErrors() {
		return this.errors.map((err) => {
			if (err.type === "field") {
				return { msg: err.msg, field: err.path };
			}
			return { msg: err.msg };
		});
	}
}
