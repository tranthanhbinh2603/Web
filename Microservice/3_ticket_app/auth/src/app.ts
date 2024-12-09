import express from "express";
import path from "path";
import "express-async-errors";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import authRoute from "./route/auth";
import { errorHandler } from "./middleware/error-handler";

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
});
