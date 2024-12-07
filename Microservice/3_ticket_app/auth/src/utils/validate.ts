// Read more here: https://express-validator.github.io/docs/guides/manually-running
import express from "express";
import { ContextRunner } from "express-validator";

const validate = (validations: ContextRunner[]) => {
	return async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		for (const validation of validations) {
			const result = await validation.run(req);
			if (!result.isEmpty()) {
				return res.status(400).json({ errors: result.array() });
			}
		}
		next();
	};
};

export { validate };
