import Link from "next/link";
import { Container } from "react-bootstrap";
import { getCurrentUser } from "@/app/api/getCurrentUser";

async function Header() {
	const currentUser = await getCurrentUser();
	return (
		<nav className="navbar navbar-light bg-light">
			<Container>
				<Link className="navbar-brand" href="/">
					GitTix
				</Link>
				{currentUser ? (
					<div className="d-flex justify-content-end">
						<div className="d-flex justify-content-end">
							<ul className="nav d-flex align-items-center gap-3">
								<li className="nav-item">
									Welcome, {currentUser.current_user.email}
								</li>
								<li className="nav-item">Sign out</li>
							</ul>
						</div>
					</div>
				) : (
					<div className="d-flex justify-content-end">
						<div className="d-flex justify-content-end">
							<ul className="nav d-flex align-items-center gap-3">
								<li className="nav-item">
									<Link href="/auth/sign-in">Sign in</Link>
								</li>
								<li className="nav-item">
									<Link href="/auth/sign-up">Sign up</Link>
								</li>
							</ul>
						</div>
					</div>
				)}
			</Container>
		</nav>
	);
}

export default Header;
