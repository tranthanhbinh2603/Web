import request from "supertest";
import { app } from "../app";
import { signUpUser } from "./sign_up.test";

export const signInUser = async () => {
	await signUpUser();
	const response = await request(app).post("/api/users/sign-in").send({
		email: "test@test.com",
		password: "password",
	});
	expect(response.status).toBe(200);
	expect(response.body.msg).toBe("successful");
	expect(response.body.data).toBeDefined();
	expect(response.body.data.email).toBe("test@test.com");
	expect(response.body.data.id).toBeDefined();
	expect(typeof response.body.data.id).toBe("string");
	expect(response.get("Set-Cookie")).toBeDefined();
	return response.get("Set-Cookie");
};

it("SIGN IN: Login with valid data", async () => {
	await signInUser();
});

it("SIGN IN: Login with incorrect email", async () => {
	await signUpUser();
	const response = await request(app).post("/api/users/sign-in").send({
		email: "test1@test.com",
		password: "password",
	});
	expect(response.status).toBe(500);
	expect(response.body.errors).toBeDefined();
	expect(response.body.errors.length).toBe(1);
	expect(response.body.errors[0].msg).toBe("Wrong credential");
});

it("SIGN IN: Login with incorrect password", async () => {
	await signUpUser();
	const response = await request(app).post("/api/users/sign-in").send({
		email: "test@test.com",
		password: "password123",
	});
	expect(response.status).toBe(500);
	expect(response.body.errors).toBeDefined();
	expect(response.body.errors.length).toBe(1);
	expect(response.body.errors[0].msg).toBe("Wrong credential");
});

it("SIGN IN: Login user is not in the system", async () => {
	const response = await request(app).post("/api/users/sign-in").send({
		email: "test@test.com",
		password: "password",
	});
	expect(response.status).toBe(500);
	expect(response.body.errors).toBeDefined();
	expect(response.body.errors.length).toBe(1);
	expect(response.body.errors[0].msg).toBe("Wrong credential");
});
