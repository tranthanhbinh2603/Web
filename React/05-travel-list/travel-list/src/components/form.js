import { useState } from "react";

export default function Form({ onAddItem }) {
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);
	function handleSubmit(e) {
		e.preventDefault();
		if (!description) return;
		const newItem = {
			id: Date.now(),
			description: description,
			quantity: quantity,
			packed: false,
		};
		onAddItem(newItem);
		setDescription("");
		setQuantity(1);
	}
	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need for your trip</h3>
			<select
				onChange={(e) => Number(setQuantity(e.target.value))}
				value={quantity}
			>
				{Array.from({ length: 20 }, (_, i) => {
					return i + 1;
				}).map((num) => {
					return (
						<option value={num} key={num}>
							{num}
						</option>
					);
				})}
			</select>
			<input
				type="text"
				placeholder="Item..."
				onChange={(e) => setDescription(e.target.value)}
				value={description}
			></input>
			<button>Add</button>
		</form>
	);
}
