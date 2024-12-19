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
		if (typeof window === "undefined") {
			response = await axios.get(
				"https://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current-user",
				{
					headers: {
						...Object.fromEntries(serverHeaders.entries()),
					},
					httpsAgent: agent,
				}
			);
		} else {
			response = await axios.get(
				"https://ticket-app.com/api/users/current-user"
			);
		}
		console.log(response);
		user = response;
	} catch (error) {
		console.error("Error fetching user:", error.message);
	}

	return (
		<div>
			<h1>Home Page</h1>
			<p>User: {user ? JSON.stringify(user) : "No user found"}</p>
		</div>
	);
};

export default Home;
