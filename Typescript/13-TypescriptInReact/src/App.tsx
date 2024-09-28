import { useState } from "react";
import FormAddTask from "./FormAddTask";
import RenderTask from "./RenderTask";

interface TaskInterface {
	name: string | undefined;
	duration: string | undefined;
	id?: number | undefined;
}

const App: React.FC = () => {
	const [ListTask, setListTask] = useState<TaskInterface[]>([
		{ id: 1, name: "To do homework", duration: "2 days" },
		{ id: 2, name: "Coding", duration: "1 months" },
		{ id: 3, name: "Playing game", duration: "Never" },
	]);

	const handleAddTask = (objectAdd: TaskInterface) => {
		objectAdd = { ...objectAdd, id: Date.now() };
		setListTask([...ListTask, objectAdd]);
	};

	const deleteTask = (id: number | undefined) => {
		setListTask(ListTask.filter((task) => task.id !== id));
	};

	return (
		<>
			<FormAddTask handleAddTask={handleAddTask} />
			<ul>
				{ListTask.map((task) => (
					<RenderTask task={task} key={task.id} deleteTask={deleteTask} />
				))}
			</ul>
		</>
	);
};

export default App;
