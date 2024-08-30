import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import AppBar from "@mui/material/AppBar";
import AddTask from "../features/EditList/AddTask";
import { useState } from "react";

function NavBar() {
	const [open, setOpen] = useState(false);

	// Hàm mở modal
	const handleClickOpen = () => {
		setOpen(true);
	};

	// Hàm đóng modal
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<AppBar
				position="static"
				sx={{
					boxShadow:
						"0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);",
				}}
			>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						My Lists
					</Typography>
					<IconButton color="inherit" onClick={handleClickOpen}>
						<AddIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			{open ? <AddTask handleClose={handleClose} /> : <></>}
		</>
	);
}

export default NavBar;
