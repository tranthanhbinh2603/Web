interface TaskProp {
	task: {
		name: String | undefined;
		duration: String | undefined;
		id?: number | undefined;
	};
	deleteTask: (id: number | undefined) => void;
}

const RenderTask: React.FC<TaskProp> = ({ task, deleteTask }) => {
	return (
		<li>
			<b>{task.name}</b> - {task.duration}
			<button onClick={() => deleteTask(task.id)}>DELETE!</button>
		</li>
	);
};

export default RenderTask;
