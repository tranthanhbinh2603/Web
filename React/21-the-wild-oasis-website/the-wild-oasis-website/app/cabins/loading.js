import Spinner from "../_components/Spinner";

export default function loading() {
	return (
		<>
			<Spinner />
			<p className="text-center">Loading cabins...</p>
		</>
	);
}
