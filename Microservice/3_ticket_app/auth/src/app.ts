import path from "path";
import helmet from "helmet";
import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import authRoute from "./route/auth";
import cookieSession from "cookie-session";
import mongoSanitize from "express-mongo-sanitize";
import { NotFoundError } from "./error/not-found-error";
import { errorHandler } from "./middleware/error-handler";

const app = express();
app.set("trust proxy", true);
app.use(
	cookieSession({
		signed: false, //Luu y la chi dung cho viec khong development
		secure: true,
	})
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname) + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(helmet({ contentSecurityPolicy: false }));

// =====================================

// CONNECT DATABASE HERE

// YOUR REDIRECT MIDDLEWARE HERE (Example if the path is not defined method....)

// YOUR MAIN REDIRECT HERE
app.use("/api/users", authRoute);

app.all("*", async (_req, _res) => {
	throw new NotFoundError();
});

// YOUR CATCH IN DATABASE MONGO HERE

// =====================================

app.use(errorHandler);

app.listen(5050, () => {
	console.log("Finish start server at port 5050");
	console.log("===========================");
	mongoose
		.connect("mongodb://auth-mongo:27017/ticket_app")
		.then(async () => {
			console.log("Connect Successful!");
			console.log("===========================");
		})
		.catch((e) => {
			console.log("Error when connect");
			console.log(`This is error: ${e}`);
			console.log("===========================");
		});
});
