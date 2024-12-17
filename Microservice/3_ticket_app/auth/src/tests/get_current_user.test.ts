import request from "supertest";
import { app } from "../app";
import { signInUser } from "./sign_in.test";

it("GET INFO: Get info when logged", async () => {
	const cookies = await signInUser();
	const response = await request(app)
		.get("/api/users/current-user")
		.send({})
		.set("Cookie", cookies);
	expect(response.status).toBe(200);
	expect(response.body.current_user).toBeDefined();
	expect(response.body.current_user.id).toBeDefined();
	expect(response.body.current_user.email).toBeDefined();
	expect(response.body.current_user.email).toBe("test@test.com");
});

it("GET INFO: Get info when not logged", async () => {
	const response = await request(app).get("/api/users/current-user").send({});
	expect(response.status).toBe(401);
	expect(response.body.errors).toBeDefined();
	expect(response.body.errors.length).toBe(1);
	expect(response.body.errors[0].msg).toBe("You are not logged in.");
});
