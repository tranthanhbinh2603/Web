export abstract class CustomError extends Error {
	abstract statusCode: number;

	abstract printLog: boolean;

	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, CustomError.prototype);
	}

	abstract serializeErrors(): { msg: string; field?: string }[];
}
