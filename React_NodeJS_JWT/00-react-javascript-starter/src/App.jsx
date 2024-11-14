import axios from "./utils/axios.interceptor";
import { useEffect } from "react";

function App() {
	useEffect(() => {
		async function getAPI() {
			const result = await axios.get("/v1/api/");
			console.log(result);
		}
		getAPI();
	}, []);
	return <></>;
}

export default App;
