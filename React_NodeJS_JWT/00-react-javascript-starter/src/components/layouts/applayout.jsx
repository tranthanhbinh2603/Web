/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import { AppContext } from "../../contextAPI/AppAPI";
import { useContext } from "react";

function AppLayout() {
	const { current, setCurrent } = useContext(AppContext);
	return (
		<div>
			<Header current={current} setCurrent={setCurrent} />
			<Outlet />
			<Footer />
		</div>
	);
}

export default AppLayout;
