/* eslint-disable react/prop-types */
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";

function AddTask({ handleClose }) {
	// Thêm `open` vào props
	return (
		<Dialog open={true} onClose={handleClose}>
			<DialogTitle>Modal Title</DialogTitle>
			<DialogContent>
				<Typography>This is a simple modal example.</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Close
				</Button>
				<Button onClick={handleClose} color="primary">
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddTask;
