import { CustomError } from "./custom-error";

export class UserExistError extends CustomError {
	printLog = false;

	statusCode = 409;

	reason = "User exist";

	constructor() {
		super("User exist");

		Object.setPrototypeOf(this, UserExistError.prototype);
	}

	serializeErrors() {
		return [{ msg: this.reason }];
	}
}
