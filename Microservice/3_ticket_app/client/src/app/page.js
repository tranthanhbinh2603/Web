import { Container } from "react-bootstrap";
import { getCurrentUser } from "./api/getCurrentUser";

const Home = async () => {
	const currentUser = await getCurrentUser();
	return (
		<Container>
			<h1 className="mt-3">
				{currentUser
					? "Welcome to GixTix!"
					: "Please login to use this service!"}
			</h1>
		</Container>
	);
};

export default Home;
