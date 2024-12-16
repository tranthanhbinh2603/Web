import helmet from "helmet";
import express from "express";
import "express-async-errors";
import authRoute from "./routes/auth";
import cookieSession from "cookie-session";
import mongoSanitize from "express-mongo-sanitize";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middleware/error-handler";

const app = express();
app.set("trust proxy", true);
app.use(
	cookieSession({
		signed: false, //Luu y la chi dung cho viec khong development
		secure: true,
	})
);
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

export { app };
