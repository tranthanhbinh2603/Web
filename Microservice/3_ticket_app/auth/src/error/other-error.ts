import { CustomError } from "./custom-error";

export class OtherError extends CustomError {
	printLog = false;

	statusCode = 409;

	reason: string = "Hum.....";

	constructor(msg?: string) {
		super(msg || "Something went wrong");
		if (msg) {
			this.reason = msg;
		}
		Object.setPrototypeOf(this, OtherError.prototype);
	}

	serializeErrors() {
		return [{ msg: this.reason }];
	}
}
