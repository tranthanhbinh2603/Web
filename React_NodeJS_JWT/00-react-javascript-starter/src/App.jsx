import axios from "./utils/axios.interceptor";
import { useEffect } from "react";

function App() {
	useEffect(() => {
		axios.get("/v1/api/");
	}, []);
	return <></>;
}

export default App;
