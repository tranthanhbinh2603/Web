import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
	printLog = false;

	statusCode = 401;

	constructor() {
		super("You are not logged in.");

		Object.setPrototypeOf(this, NotAuthorizedError.prototype);
	}

	serializeErrors() {
		return [{ msg: "You are not logged in." }];
	}
}
