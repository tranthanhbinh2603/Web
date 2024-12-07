import express, { Request, Response } from "express";
const app = express.Router();

app.get("/currentuser", (_req: Request, res: Response) => {
	res.status(200).json({
		message: "successful",
	});
});

export default app;
