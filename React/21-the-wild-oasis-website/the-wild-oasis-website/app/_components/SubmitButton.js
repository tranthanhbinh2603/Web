import { useFormStatus } from "react-dom";

export function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			className={`${
				!pending ? "bg-accent-500" : "bg-primary-800"
			} px-8 py-4 {text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300`}
		>
			{pending ? "Please wait..." : "Reserve now"}
		</button>
	);
}
