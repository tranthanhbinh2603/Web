import { CustomError } from "./custom-error";

export class UserExistError extends CustomError {
	printLog = false;

	statusCode = 409;

	reason: string = "User exist";

	constructor(msg?: string) {
		super(msg || "User already exists");
		if (msg) {
			this.reason = msg;
		}
		Object.setPrototypeOf(this, UserExistError.prototype);
	}

	serializeErrors() {
		return [{ msg: this.reason }];
	}
}
