import RenderTask from "./RenderTask";

const App: React.FC = () => {
	const ListTask = [
		{ name: "To do homework", duration: "2 days" },
		{ name: "Coding", duration: "1 months" },
		{ name: "Playing game", duration: "Never" },
	];
	return (
		<ul>
			{ListTask.map((task) => (
				<RenderTask task={task} />
			))}
		</ul>
	);
};

export default App;
