import { useRef } from "react";

const FormAddTask: React.FC = () => {
	// Cách làm thông thường:
	// const [nameTask, setNameTask] = useState("");
	// const [duration, setDuration] = useState("");

	// const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	setNameTask(event.target.value);
	// };

	// const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	setDuration(event.target.value);
	// };

	// const sendData = (event: React.FormEvent) => {
	// 	event.preventDefault();
	// 	console.log(nameTask, " ", duration);
	// };

	// Cách làm khác:

	const nameTaskRef = useRef<HTMLInputElement>(null);
	const durationRef = useRef<HTMLInputElement>(null);

	const sendData = (event: React.FormEvent) => {
		event.preventDefault();
		console.log(nameTaskRef.current?.value, " ", durationRef.current?.value);
	};

	return (
		<form onSubmit={sendData}>
			<input
				name="name"
				placeholder="Name task"
				// value={nameTask}
				// onChange={handleNameChange}
				ref={nameTaskRef}
			/>
			<input
				name="duration"
				placeholder="Duration"
				// value={duration}
				// onChange={handleDurationChange}
				ref={durationRef}
			/>
			<button>Summit</button>
		</form>
	);
};

export default FormAddTask;
