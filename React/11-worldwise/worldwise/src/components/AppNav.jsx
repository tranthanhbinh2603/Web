import styles from "./AppNav.module.css";
import { NavLink } from "react-router-dom";

function AppNav() {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<NavLink to="cities">City</NavLink>
				</li>
				<li>
					<NavLink to="countries">Country</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default AppNav;
