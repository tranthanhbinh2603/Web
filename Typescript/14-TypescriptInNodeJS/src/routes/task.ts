import express, { Request, Response, Router } from "express";
import { Task } from "../models/task";
const router: Router = express.Router();

let listTasks: Task[] = [];

router.get("/", (_: Request, res: Response) => {
	res.send(listTasks);
});

router.post("/", (req: Request, res: Response) => {
	const { name, duration } = req.body as { name: string; duration: string };
	listTasks.push({ id: Date.now(), name, duration });
	res.status(200).send({ result: "Finish add task." });
});

router.patch("/", (req: Request, res: Response) => {
	const { id, name, duration } = req.body as {
		id: number;
		name: string;
		duration: string;
	};
	const taskToUpdate = listTasks.find((task) => task.id === id);
	if (taskToUpdate) {
		taskToUpdate.name = name;
		taskToUpdate.duration = duration;
		res.status(200).send({ result: "Finish edit task." });
	} else {
		res.status(420).send({ result: "Id not found." });
	}
});

router.delete("/", (req: Request, res: Response) => {
	const { id } = req.body as {
		id: number;
	};
	listTasks = listTasks.filter((task) => task.id !== id);
	res.status(200).send({ result: "Finish delete task." });
});

export default router;
