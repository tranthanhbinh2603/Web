const https = require("https");
import { headers } from "next/headers";
import axios from "@/utils/axios.interceptor";

const agent = new https.Agent({
	rejectUnauthorized: false,
});

const Home = async () => {
	let user = null;

	try {
		let response;
		const serverHeaders = await headers();
		response = await axios.get("/api/users/current-user", {
			headers: {
				...Object.fromEntries(serverHeaders.entries()),
			},
			httpsAgent: agent,
		});
		user = response;
	} catch (error) {}

	return (
		<div>
			<h1>Home Page</h1>
			<p>User: {user ? JSON.stringify(user) : "No user found"}</p>
		</div>
	);
};

export default Home;
