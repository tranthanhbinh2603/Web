import { useState, useEffect, useContext } from "react";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { AuthContext } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const { login, isAuthenticated } = useContext(AuthContext);
	const [email, setEmail] = useState("jack@example.com");
	const [password, setPassword] = useState("qwerty");
	const navigate = useNavigate();
	useEffect(
		function () {
			if (isAuthenticated) navigate("/app");
		},
		[isAuthenticated, login, navigate]
	);
	function handleLogin(e) {
		e.preventDefault();
		login(email, password);
	}
	return (
		<main className={styles.login}>
			<PageNav />
			<form className={styles.form}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<button className={styles.ctaLink} onClick={handleLogin}>
						Login
					</button>
				</div>
			</form>
		</main>
	);
}
