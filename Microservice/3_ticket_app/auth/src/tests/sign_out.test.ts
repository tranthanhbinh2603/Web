import request from "supertest";
import { app } from "../app";
import { signInUser } from "./sign_in.test";

it("SIGN OUT: Valid data", async () => {
	const cookies = await signInUser();
	const response = await request(app)
		.post("/api/users/sign-out")
		.send({})
		.set("Cookie", cookies);
	expect(response.status).toBe(200);
	const cookie = response.get("Set-Cookie");
	if (!cookie) {
		throw new Error("Expected cookie but got undefined.");
	}
	expect(cookie[0]).toEqual(
		"session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
	);
});

it("SIGN OUT: With user not login", async () => {
	const response = await request(app).post("/api/users/sign-out").send({});
	expect(response.status).toBe(401);
	expect(response.body.errors).toBeDefined();
	expect(response.body.errors.length).toBe(1);
	expect(response.body.errors[0].msg).toBe("You are not logged in.");
});
