import FormAddTask from "./FormAddTask";
import RenderTask from "./RenderTask";

const App: React.FC = () => {
	const ListTask = [
		{ id: 1, name: "To do homework", duration: "2 days" },
		{ id: 2, name: "Coding", duration: "1 months" },
		{ id: 3, name: "Playing game", duration: "Never" },
	];
	return (
		<>
			<FormAddTask />
			<ul>
				{ListTask.map((task) => (
					<RenderTask task={task} key={task.id} />
				))}
			</ul>
		</>
	);
};

export default App;
