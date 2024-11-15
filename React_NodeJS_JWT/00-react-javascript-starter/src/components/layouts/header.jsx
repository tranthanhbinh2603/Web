/* eslint-disable react/prop-types */
//Tìm hiểu thêm về Menu Component tại: https://ant.design/components/menu
import {
	HomeOutlined,
	UsergroupAddOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const items = [
	{
		label: "Home",
		key: "home",
		icon: <HomeOutlined />,
	},
	{
		label: "Users",
		key: "users",
		icon: <UsergroupAddOutlined />,
	},
	{
		label: "Welcome, Tran Thanh Binh",
		key: "SubMenu",
		icon: <UserOutlined />,
		children: [
			{
				label: "Register",
				key: "register",
			},
			{
				label: "Login",
				key: "login",
			},
		],
	},
];
const Header = ({ current, setCurrent }) => {
	const navigate = useNavigate();
	const onClick = (e) => {
		setCurrent(e.key);
		if (e.key === "register") {
			navigate("/register");
		}
		if (e.key === "login") {
			navigate("/login");
		}
		if (e.key === "home") {
			navigate("/");
		}
		if (e.key === "users") {
			navigate("/users");
		}
	};
	return (
		<Menu
			onClick={onClick}
			selectedKeys={[current]}
			mode="horizontal"
			items={items}
		/>
	);
};
export default Header;
