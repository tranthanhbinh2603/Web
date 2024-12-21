import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
	statusCode = 500;

	reason: string = "Hum.....";

	constructor(isPrintLog?: boolean, msg?: string) {
		super(msg || "Something went wrong", isPrintLog ?? false);
		if (msg) {
			this.reason = msg;
		}
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}

	serializeErrors() {
		return [{ msg: this.reason }];
	}
}
