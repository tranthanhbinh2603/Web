import { useState } from "react";
export default function PackingList({
	items,
	onRemoveItem,
	onToggleItem,
	onDeleteList,
}) {
	const [typeSort, setTypeSort] = useState("input");
	function handleTypeSort(e) {
		setTypeSort(e);
	}
	let sortedItem;
	if (typeSort === "input") sortedItem = items;
	else if (typeSort === "description")
		sortedItem = items.sort((a, b) =>
			a.description.localeCompare(b.description)
		);
	else if (typeSort === "packed")
		sortedItem = items.sort((a, b) => Number(a.packed) - Number(b.packed));
	return (
		<div className="list">
			<ul>
				{sortedItem.map((item) => (
					<Item
						item={item}
						key={item.id}
						onRemoveItem={onRemoveItem}
						onToggleItem={onToggleItem}
					/>
				))}
			</ul>
			<div className="actions" onChange={(e) => handleTypeSort(e.target.value)}>
				<select>
					<option value="input">Sort by input order</option>
					<option value="description">Sort by description order</option>
					<option value="packed">Sort by packed order</option>
				</select>
				<button onClick={onDeleteList}>Delete list</button>
			</div>
		</div>
	);
}

function Item({ item, onRemoveItem, onToggleItem }) {
	return (
		<li>
			<input type="checkbox" onChange={() => onToggleItem(item.id)}></input>
			<span className={item.packed ? "remove" : ""}>
				{item.quantity} {item.description}
			</span>
			<button onClick={() => onRemoveItem(item.id)}>❌</button>
		</li>
	);
}
