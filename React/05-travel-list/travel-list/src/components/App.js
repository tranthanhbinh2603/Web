import { useState } from "react";
import Logo from "./logo";
import Form from "./form";
import PackingList from "./packing_list";
import Stats from "./stat";

export default function App() {
	const [items, setItems] = useState([]);
	function handleAddItems(item) {
		setItems([...items, item]);
	}
	function handleRemoveItems(id) {
		setItems(items.filter((item) => item.id !== id));
	}
	function handleToggleItems(id) {
		setItems(
			items.map((item) =>
				item.id === id
					? { ...item, packed: !item.packed }
					: { ...item, packed: item.packed }
			)
		);
	}
	function handleDeleteList() {
		setItems([]);
	}
	return (
		<div className="app">
			<Logo />
			<Form onAddItem={handleAddItems} />
			<PackingList
				items={items}
				onRemoveItem={handleRemoveItems}
				onToggleItem={handleToggleItems}
				onDeleteList={handleDeleteList}
			/>
			<Stats items={items} />
		</div>
	);
}
