import express, { Application } from "express";
import { Request, Response } from "express";
import methodOverride from "method-override";
import helmet from "helmet";
import TaskRoute from "./routes/task";
const app: Application = express();
app.use(methodOverride());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(helmet({ contentSecurityPolicy: false }));

// =====================================

// YOUR MIDDLEWARE HERE
app.use(express.json());

// YOUR MAIN REDIRECT HERE
app.use("/task", TaskRoute);

// =====================================

app.use((_: Request, res: Response) => {
	res.status(404).send("Page Not Found");
});

app.use((err: any, req: Request, res: Response) => {
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
	console.log("Finish start server");
	console.log("===========================");
});
