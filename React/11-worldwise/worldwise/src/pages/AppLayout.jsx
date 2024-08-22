import { useContext, useEffect } from "react";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from "./AppLayout.module.css";
import { AuthContext } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function AppLayout() {
	const { isAuthenticated } = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(
		function () {
			if (!isAuthenticated) navigate("/login");
		},
		[isAuthenticated, navigate]
	);
	return (
		<div className={styles.app}>
			<Sidebar />
			<Map />
			<User />
		</div>
	);
}

export default AppLayout;
