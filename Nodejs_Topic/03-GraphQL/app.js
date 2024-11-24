const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const flash = require("connect-flash");
const taskRoute = require("./route/task");
require("dotenv").config();
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname) + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(mongoSanitize());
app.use(helmet({ contentSecurityPolicy: false }));

app.use(flash());

app.use((req, res, next) => {
	next();
});

// =====================================

// CONNECT DATABASE HERE

const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
mongoose
	.connect(process.env.MONGO_DB_URL)
	.then(() => {
		console.log("Connect Successful!");
	})
	.catch((e) => {
		console.log("Error when connect");
		console.log(`This is error: e`);
	});

// YOUR REDIRECT MIDDLEWARE HERE (Example if the path is not define method....)

// YOUR MAIN REDIRECT HERE
app.use("/task", taskRoute);
app.use(
	"/graphql",
	graphqlHTTP({
		schema: graphqlSchema,
		rootValue: graphqlResolver,
		graphiql: true, //Chế độ debugger. Bạn chỉ cần vào theo path ở trên là sẽ vào được
		customFormatErrorFn(err) {
			if (!err.originalError) {
				return err;
			}
			const message = err.originalError.message || "An error occurred. ";
			const code = err.originalError.status || 500;
			return { message: message, status: code };
		},
	})
);

// YOUR CATCH IN DATABASE MONGO HERE

// =====================================

app.use((req, res) => {
	res.status(404);
});

app.use((err, req, res, next) => {
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
