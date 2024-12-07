import express from "express";
import {
	createUser,
	getUserInfo,
	signInUser,
	signOutUser,
} from "../controller/auth";
const app = express.Router();

app.get("/sign-up", createUser);
app.get("/sign-in", signInUser);
app.get("/sign-out", signOutUser);
app.get("/current-user", getUserInfo);

export default app;
