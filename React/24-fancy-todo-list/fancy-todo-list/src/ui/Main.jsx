import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import ListGroups from "../features/ShowList/ListGroups";
import TaskInGroup from "../features/ShowList/TaskInGroup";

function Main() {
	const data = {
		name: "Group 2",
		icon: "Abc",
		smallTask: [
			{ name: "task 4", id: "0292" },
			{ name: "task 5", id: "0123" },
			{ name: "task 6", id: "062662" },
		],
		id: 2,
	};
	return (
		<Box
			sx={{
				display: "flex",
				height: "calc(100vh - 64px)", // Chiếm toàn bộ chiều cao của viewport
				maxWidth: "calc(100% - 1px)",
			}}
		>
			<Box
				sx={{
					flex: "0 0 25%",
					py: 1,
					height: "100%", // Chiếm toàn bộ chiều cao của phần tử cha
				}}
			>
				<ListGroups />
			</Box>
			<Divider orientation="vertical" flexItem sx={{ borderRightWidth: 1 }} />
			<Box
				sx={{
					flex: "0 0 75%",
					padding: 3,
					height: "100%", // Chiếm toàn bộ chiều cao của phần tử cha
				}}
			>
				<TaskInGroup task={data} />
			</Box>
		</Box>
	);
}

export default Main;
