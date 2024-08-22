import { useContext } from "react";
import styles from "./User.module.css";
import { AuthContext } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function User() {
	const { user, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	console.log(user);
	if (!user) return navigate("/login");
	function handleClick(e) {
		e.preventDefault();
		logout();
		navigate("/");
	}

	return (
		<div className={styles.user}>
			<img src={user.avatar} alt={user.name} />
			<span>Welcome, {user.name}</span>
			<button onClick={handleClick}>Logout</button>
		</div>
	);
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
