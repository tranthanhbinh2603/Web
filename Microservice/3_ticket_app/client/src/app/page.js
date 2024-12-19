import { getCurrentUser } from "./api/getCurrentUser";

const Home = async () => {
	const currentUser = await getCurrentUser();
	return (
		<div>
			<h1>Home Page</h1>
			<p>User: {currentUser ? JSON.stringify(currentUser) : "No user found"}</p>
		</div>
	);
};

export default Home;
