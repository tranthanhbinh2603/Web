import express, { Request, Response, NextFunction } from "express";
import path from "path";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import authRoute from "./route/auth";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname) + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(helmet({ contentSecurityPolicy: false }));

class AppError extends Error {
	status: number;
	message: string;

	constructor(message: string, status: number) {
		super(message);
		this.status = status;
		this.message = message;
		Object.setPrototypeOf(this, AppError.prototype);
	}
}

// function wrapAsync(
// 	fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
// ) {
// 	return (req: Request, res: Response, next: NextFunction) => {
// 		fn(req, res, next).catch((e: Error) => next(e));
// 	};
// }

app.use((_req: Request, _res: Response, next: NextFunction) => {
	next();
});

// =====================================

// CONNECT DATABASE HERE

// YOUR REDIRECT MIDDLEWARE HERE (Example if the path is not defined method....)

// YOUR MAIN REDIRECT HERE
app.use("/api/users", authRoute);

// YOUR CATCH IN DATABASE MONGO HERE

// =====================================

app.use((_req: Request, res: Response) => {
	res.status(404).json({
		message: "Not Found",
	});
});

app.use((err: AppError, req: Request, res: Response, _next: NextFunction) => {
	const { status = 500, message = "Something Went Wrong" } = err;
	console.log("ERROR FOUND!");
	console.log("URL Client Request:", req.ip);
	console.log("Method:", req.method);
	console.log("Url:", req.originalUrl);
	console.log("Status:", res.statusCode);
	console.log("Res:", res.getHeader("Content-Length"));
	console.log("Response time:", res.getHeader("X-Response-Time"));
	console.log("User-agent:", req.get("User-Agent"));
	console.log("Error: ", err);
	console.log("===========================");
	res.status(status).send(message);
});

app.listen(5050, () => {
	console.log("Finish start server at port 5050");
	console.log("===========================");
});
