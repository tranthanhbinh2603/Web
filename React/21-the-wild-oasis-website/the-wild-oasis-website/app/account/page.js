// import axios from "axios";
// import Counter from "../_components/Counter";

import { auth } from "../_lib/auth";

// export const metadata = {
// 	title: "Account",
// };

// export default async function Account() {
// 	const response = await axios.get(
// 		"https://jsonplaceholder.typicode.com/users"
// 	);
// 	const users = response.data;

// 	return (
// 		<div>
// 			<h1>Account</h1>
// 			<ul>
// 				{users.map((user) => (
// 					<li key={user.id}>{user.name}</li>
// 				))}
// 				<Counter users={users} />
// 			</ul>
// 		</div>
// 	);
// }

export const metadata = {
	title: "Guest area",
};

export default async function Page() {
	const session = await auth();
	return (
		<h2 className="font-semibold text-2xl text-accent-400 mb-7">
			Welcome, {session?.user?.name}
		</h2>
	);
}
