export abstract class CustomError extends Error {
	abstract statusCode: number;

	printLog: boolean;

	constructor(message: string, isPrintLog: boolean = false) {
		super(message);
		this.printLog = isPrintLog;
		Object.setPrototypeOf(this, CustomError.prototype);
	}

	abstract serializeErrors(): { msg: string; field?: string }[];
}
