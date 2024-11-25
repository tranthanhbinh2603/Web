import { Elysia } from "elysia";

class UpdateManager {
	private updateAt: String = "";

	setState(value: string) {
		this.updateAt = value;
	}

	getState() {
		return this.updateAt;
	}
}

const app = new Elysia()
	.get("/", () => "Welcome to BLOG POST, using RESTFUL API.")
	//Create state
	.state("version", 1)
	//Create Decoration
	.decorate("UpdateDate", new UpdateManager())
	//Create decorate
	//Get all post
	.get("/posts", ({ store, UpdateDate }) => {
		return {
			version: store.version,
			update_at: UpdateDate.getState(),
			message: "Successful",
		};
	})
	//Get one post
	.get("/post/:id", ({ params }) => {
		return { id: params.id, message: "Successful" };
	})
	//Create post
	.post("/post", ({ body, set, UpdateDate }) => {
		set.status = 201;
		UpdateDate.setState(new Date().toISOString());
		return { body, message: "Successful" };
	})
	//Edit post
	.post("/post/:id", ({ body, set, UpdateDate }) => {
		set.status = 200;
		UpdateDate.setState(new Date().toISOString());
		return { body, message: "Successful" };
	})
	//Delete post
	.delete("/post/:id", ({ UpdateDate }) => {
		UpdateDate.setState(new Date().toISOString());
		return { message: "Successful" };
	})
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
