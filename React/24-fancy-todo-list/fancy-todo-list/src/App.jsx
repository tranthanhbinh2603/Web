import Box from "@mui/material/Box";
import NavBar from "./ui/NavBar";
import Main from "./ui/Main";

function App() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<NavBar></NavBar>
			<Main></Main>
		</Box>
	);
}

export default App;
