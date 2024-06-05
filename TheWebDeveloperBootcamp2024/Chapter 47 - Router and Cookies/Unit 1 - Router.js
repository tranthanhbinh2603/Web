const express = require("express");
const app = express();
const notMiddleware = require("./router/not middleware");
const haveMiddleware = require("./router/have middleware");

// CONNECT DATABASE HERE

// YOUR REDIRECT MIDDLEWARE HERE (Example if the path is not define method....)

// YOUR MAIN

app.use("/dogs", notMiddleware);
app.use("/cats", haveMiddleware);

// YOUR CATCH IN DATABASE MONGO HERE

// =====================================

app.use((req, res) => {
	res.status(404).send("Wrong path!!!!");
});

app.listen(5050, () => {
	console.log("Finish start server");
	console.log("===========================");
});
