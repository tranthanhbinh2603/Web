import express from "express";

import {
	createUser,
	getUserInfo,
	signInUser,
	signOutUser,
} from "../controller/auth";
import {
	validateRegisterUser,
	validateLoginUser,
} from "../middleware/validation";
const app = express.Router();

app.post("/sign-up", validateRegisterUser, createUser);
app.post("/sign-in", validateLoginUser, signInUser);
app.post("/sign-out", signOutUser);
app.get("/current-user", getUserInfo);

export default app;
