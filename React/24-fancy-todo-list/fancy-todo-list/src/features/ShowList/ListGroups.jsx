import { useState } from "react";
import { useLocalStorageState } from "../../hook/useLocalStorageState";
import ItemGroup from "./ItemGroup";

function ListGroups() {
	const [listTask] = useLocalStorageState(
		[
			{
				name: "Group 1",
				icon: "AcUnit",
				smallTask: ["task 1", "task 2", "task 3"],
				id: 1,
			},
			{
				name: "Group 2",
				icon: "Abc",
				smallTask: ["task 4", "task 5", "task 6"],
				id: 2,
			},
		],
		"TaskMemo"
	);

	const [selectedIndex, setSelectedIndex] = useState(null);

	const handleClick = (index) => {
		setSelectedIndex(index);
	};

	return (
		<div>
			{listTask.map((task, index) => (
				<ItemGroup
					key={task.id}
					name={task.name}
					icon={task.icon}
					isSelected={selectedIndex === index}
					onClick={() => handleClick(index)}
				/>
			))}
		</div>
	);
}

export default ListGroups;
