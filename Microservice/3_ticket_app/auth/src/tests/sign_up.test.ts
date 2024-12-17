import request from "supertest";
import { app } from "../app";

export const signUpUser = async () => {
	const response = await request(app).post("/api/users/sign-up").send({
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
};

it("SIGN UP: Valid data", async () => {
	await signUpUser();
});

it("SIGN UP: Not allow two same email", async () => {
	let response = await request(app).post("/api/users/sign-up").send({
		email: "email1@test.com",
		password: "password",
	});
	response = await request(app).post("/api/users/sign-up").send({
		email: "email1@test.com",
		password: "password",
	});
	expect(response.status).toBe(409);
	expect(response.body.errors).toBeDefined();
	expect(response.body.errors.length).toBe(1);
	expect(response.body.errors[0].msg).toBe("Email is used");
});

it("SIGN UP: Invalid Email", async () => {
	const response = await request(app).post("/api/users/sign-up").send({
		email: "test",
		password: "password",
	});
	expect(response.status).toBe(400);
	expect(response.body.errors).toBeDefined();
	expect(response.body.errors.length).toBe(1);
	const emailError = response.body.errors.find(
		(error) => error.field === "email"
	);
	expect(emailError).toBeDefined();
	expect(emailError.msg).toBe("Please provide a valid email address");
});

it("SIGN UP: Missing Email", async () => {
	const response = await request(app).post("/api/users/sign-up").send({
		password: "password",
	});
	expect(response.status).toBe(400);
	expect(response.body.errors).toBeDefined();
	expect(response.body.errors.length).toBe(1);
	const emailError = response.body.errors.find(
		(error) => error.field === "email"
	);
	expect(emailError).toBeDefined();
	expect(emailError.msg).toBe("Please provide a valid email address");
});

it("SIGN UP: Invalid Password (Short password)", async () => {
	const response = await request(app).post("/api/users/sign-up").send({
		email: "test1@test.com",
		password: "word",
	});
	expect(response.status).toBe(400);
	expect(response.body.errors).toBeDefined();
	expect(response.body.errors.length).toBe(1);
	const passwordError = response.body.errors.find(
		(error) => error.field === "password"
	);
	expect(passwordError).toBeDefined();
	expect(passwordError.msg).toBe("Password must be at least 6 characters");
});

it("SIGN UP: Invalid Password (Long password)", async () => {
	const response = await request(app).post("/api/users/sign-up").send({
		email: "test1@test.com",
		password: "thisIsLongPasswordIThinkIt;",
	});
	expect(response.status).toBe(400);
	expect(response.body.errors).toBeDefined();
	expect(response.body.errors.length).toBeGreaterThan(0);
	const passwordError = response.body.errors.find(
		(error) => error.field === "password"
	);
	expect(passwordError).toBeDefined();
	expect(passwordError.msg).toBe("Password must not exceed 20 characters");
});

it("SIGN UP: Password Vietnamese", async () => {
	const response = await request(app).post("/api/users/sign-up").send({
		email: "test1@test.com",
		password: "đây là một mật khẩu",
	});
	expect(response.status).toBe(200);
	expect(response.body.msg).toBe("successful");
	expect(response.body.data).toBeDefined();
	expect(response.body.data.email).toBe("test1@test.com");
	expect(response.body.data.id).toBeDefined();
	expect(typeof response.body.data.id).toBe("string");
});

it("SIGN UP: Missing Password", async () => {
	const response = await request(app).post("/api/users/sign-up").send({
		email: "test2@test.com",
	});
	expect(response.status).toBe(400);
	expect(response.body.errors).toBeDefined();
	expect(response.body.errors.length).toBeGreaterThan(0);
	const passwordError = response.body.errors.find(
		(error) => error.field === "password"
	);
	expect(passwordError).toBeDefined();
	expect(passwordError.msg).toBe("Password must be at least 6 characters");
});

it("SIGN UP: Invalid Email And Password", async () => {
	const response = await request(app).post("/api/users/sign-up").send({
		email: "test",
		password: "word",
	});
	expect(response.status).toBe(400);
	expect(response.body.errors).toBeDefined();
	expect(response.body.errors.length).toBe(2);
	const passwordError = response.body.errors.find(
		(error) => error.field === "password"
	);
	expect(passwordError).toBeDefined();
	const emailError = response.body.errors.find(
		(error) => error.field === "email"
	);
	expect(emailError).toBeDefined();
	expect(passwordError.msg).toBe("Password must be at least 6 characters");
	expect(emailError.msg).toBe("Please provide a valid email address");
});

it("SIGN UP: Missing Email And Password", async () => {
	const response = await request(app).post("/api/users/sign-up").send({});
	expect(response.status).toBe(400);
	expect(response.body.errors).toBeDefined();
	expect(response.body.errors.length).toBe(2);
	const passwordError = response.body.errors.find(
		(error) => error.field === "password"
	);
	expect(passwordError).toBeDefined();
	const emailError = response.body.errors.find(
		(error) => error.field === "email"
	);
	expect(emailError).toBeDefined();
	expect(passwordError.msg).toBe("Password must be at least 6 characters");
	expect(emailError.msg).toBe("Please provide a valid email address");
});
