import path from "path";
import helmet from "helmet";
import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import authRoute from "./route/auth";
import mongoSanitize from "express-mongo-sanitize";
import { errorHandler } from "./middleware/error-handler";
import { User } from "./model/user";

const app = express();

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
			await User.build({ email: "haha@gmail.com", password: "123" });
		})
		.catch((e) => {
			console.log("Error when connect");
			console.log(`This is error: ${e}`);
			console.log("===========================");
		});
});
