import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
	printLog = false;

	statusCode = 500;

	reason: string = "Hum.....";

	constructor(msg?: string) {
		super(msg || "Something went wrong");
		if (msg) {
			this.reason = msg;
		}
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}

	serializeErrors() {
		return [{ msg: this.reason }];
	}
}
