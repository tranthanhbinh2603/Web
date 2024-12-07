import express from "express";

import {
	createUser,
	getUserInfo,
	signInUser,
	signOutUser,
} from "../controller/auth";
import { validateUser } from "../middleware/validation";
const app = express.Router();

app.post("/sign-up", validateUser, createUser);
app.post("/sign-in", signInUser);
app.post("/sign-out", signOutUser);
app.get("/current-user", getUserInfo);

export default app;
