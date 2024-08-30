/* eslint-disable react/prop-types */
import { Box, Checkbox, Divider, IconButton, TextField } from "@mui/material";
import * as Icons from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function TaskInGroup({ task }) {
	const { icon, name, smallTask } = task;
	const IconComponent = Icons[icon];
	return (
		<>
			<Box sx={{ display: "flex", paddingBottom: 2 }}>
				<Box
					sx={{
						borderRadius: "50%", // Đặt border-radius thành 50% để tạo hình tròn
						border: "1px solid", // Đặt border
						borderColor: "rgba(0, 0, 0, 0.2)",
						width: "60px",
						height: "60px",
						display: "flex",
						justifyContent: "center", // Căn giữa theo chiều ngang
						alignItems: "center", // Căn giữa theo chiều dọc
						backgroundColor: "transparent", // Màu nền có thể thay đổi
						marginRight: 2,
					}}
				>
					{IconComponent ? (
						<IconComponent sx={{ width: "40px", height: "40px" }} />
					) : null}
				</Box>
				<TextField value={name} />
			</Box>
			<Divider orientation="horizontal" flexItem sx={{ borderRightWidth: 1 }} />
			{smallTask.map((task) => {
				return (
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							padding: 1,
						}}
						key={task.id}
					>
						<Box sx={{ display: "flex" }} key={task.id}>
							<Checkbox sx={{ mr: 2 }} />
							<TextField
								variant="standard"
								value={task.name}
								sx={{ mt: 0.2 }}
							/>
						</Box>
						<IconButton color="inherit">
							<DeleteOutlineOutlinedIcon />
						</IconButton>
					</Box>
				);
			})}
		</>
	);
}

export default TaskInGroup;
