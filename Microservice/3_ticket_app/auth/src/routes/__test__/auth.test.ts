import request from "supertest";
import { app } from "../../app";

it("returns a 200 on successful signup", async () => {
	const response = await request(app).post("/api/users/sign-up").send({
		email: "test@test.com",
		password: "password",
	});

	expect(response.status).toBe(200);
});
