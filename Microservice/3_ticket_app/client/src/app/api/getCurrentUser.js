const https = require("https");
import { headers } from "next/headers";
import axios from "../../utils/axios.interceptor";

export async function getCurrentUser() {
	const agent = new https.Agent({
		rejectUnauthorized: false,
	});
	try {
		const serverHeaders = await headers();
		const response = await axios.get("/api/users/current-user", {
			headers: {
				...Object.fromEntries(serverHeaders.entries()),
			},
			httpsAgent: agent,
		});
		return response;
	} catch (error) {
		return null;
	}
}
