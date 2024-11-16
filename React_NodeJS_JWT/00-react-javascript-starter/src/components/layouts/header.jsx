/* eslint-disable react/prop-types */
//Tìm hiểu thêm về Menu Component tại: https://ant.design/components/menu
import {
	HomeOutlined,
	UsergroupAddOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
			{
				label: "Logout",
				key: "logout",
			},
		],
	},
];

const logoutUser = (navigate) => {
	localStorage.removeItem("access_token");
	notification.success({
		message: "Logout successful.",
		description: "See you again!",
	});
	navigate("/login");
};

const Header = ({ current, setCurrent }) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: logoutUserFn } = useMutation({
		mutationFn: () => logoutUser(navigate),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
			queryClient.removeQueries();
		},
		onError: (err) => {
			console.log(err);
		},
	});
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
		if (e.key === "logout") {
			logoutUserFn(navigate);
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
