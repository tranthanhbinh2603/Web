/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

function AppLayout({ current, setCurrent }) {
	return (
		<div>
			<Header current={current} setCurrent={setCurrent} />
			<Outlet />
			<Footer />
		</div>
	);
}

export default AppLayout;
