import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
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

	app.listen(5050, () => {
		console.log("Finish start server at port 5050");
		console.log("===========================");
	});
};

start();
