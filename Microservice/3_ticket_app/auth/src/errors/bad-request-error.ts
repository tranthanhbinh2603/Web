import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
	printLog = true;

	statusCode = 500;

	reason: string = "Hum.....";

	constructor(isPrintLog?: boolean, msg?: string) {
		super(msg || "Something went wrong");
		if (msg) {
			this.reason = msg;
		}
		if (isPrintLog) {
			this.printLog = isPrintLog;
		}
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}

	serializeErrors() {
		return [{ msg: this.reason }];
	}
}
