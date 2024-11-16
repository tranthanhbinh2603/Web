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
import { useContext } from "react";
import { AppContext } from "../../contextAPI/AppAPI";

const Header = ({ current, setCurrent }) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { userInfo, resetUserInfo } = useContext(AppContext);
	const items = [
		{
			label: "Home",
			key: "home",
			icon: <HomeOutlined />,
		},
		userInfo.authenticated === true && {
			label: "Users",
			key: "users",
			icon: <UsergroupAddOutlined />,
		},
		{
			label:
				userInfo.authenticated === true
					? `Welcome ${userInfo.information.name}`
					: "Welcome",
			key: "SubMenu",
			icon: <UserOutlined />,
			children: [
				userInfo.authenticated === false && {
					label: "Register",
					key: "register",
				},
				userInfo.authenticated === false && {
					label: "Login",
					key: "login",
				},
				userInfo.authenticated === true && {
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
		resetUserInfo();
	};

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
