import { getCurrentUser } from "@/app/api/getCurrentUser";

async function Header() {
	const currentUser = await getCurrentUser();
	return (
		<header>
			<h1>
				{currentUser
					? `Welcome, ${currentUser.current_user.email}`
					: "Please login"}
			</h1>
		</header>
	);
}

export default Header;
