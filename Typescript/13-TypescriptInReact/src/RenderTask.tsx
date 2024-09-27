interface TaskProp {
	task: {
		name: String;
		duration: String;
	};
}

const RenderTask: React.FC<TaskProp> = ({ task }) => {
	return (
		<li>
			<b>{task.name}</b> - {task.duration}
		</li>
	);
};

export default RenderTask;
