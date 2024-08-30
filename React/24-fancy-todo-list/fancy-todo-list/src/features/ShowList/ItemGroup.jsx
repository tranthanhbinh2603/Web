/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import * as Icons from "@mui/icons-material";

function ItemGroup({ name, icon, isSelected, onClick }) {
	const IconComponent = Icons[icon];

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				alignItems: "center",
				backgroundColor: isSelected ? "lightblue" : "transparent",
				borderRadius: 1,
				py: 1.5,
				px: 2,
				cursor: "pointer",
				transition: "background-color 0.3s",
			}}
			onClick={onClick}
		>
			{IconComponent ? <IconComponent sx={{ mr: 2 }} /> : null}
			<Typography variant="body1">{name}</Typography>
		</Box>
	);
}

export default ItemGroup;
