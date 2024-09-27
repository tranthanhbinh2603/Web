interface TaskProp {
	task: {
		name: String | undefined;
		duration: String | undefined;
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
