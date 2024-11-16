import { createContext, useCallback, useEffect, useState } from "react";
import axiosInstance from "../utils/axios.interceptor";
import { useNetwork } from "../customhooks/useNetwork";
import { Flex, notification, Spin } from "antd";
import { Typography } from "antd";
const { Paragraph } = Typography;

const AppContext = createContext();

/* eslint-disable react/prop-types */
function AppProvider({ children }) {
	const [isOnline] = useNetwork();
	const [userInfo, setUserInfo] = useState({
		authenticated: false,
		information: {
			name: "",
		},
	});
	const [isLoading, setIsLoading] = useState(true);
	const refreshUserInfo = useCallback(
		async (token) => {
			setIsLoading(true);
			if (!isOnline) {
				return notification.error({
					message: "You don't have internet connection",
					description: "Please connect to the internet and try again.",
				});
			}
			try {
				const dataInfo = await axiosInstance.post("/v1/api/info_user", token);
				setUserInfo({
					authenticated: true,
					information: {
						name: dataInfo.name,
					},
				});
			} catch (error) {
				if (error.code === "ERR_NETWORK") {
					notification.error({
						message: "Connection Failed",
						description:
							"Could not connect to the server. Please check your internet connection or the server status.",
					});
				} else if (error.response?.status === 401) {
					resetUserInfo();
				} else {
					resetUserInfo();
				}
			}
			setIsLoading(false);
		},
		[isOnline, setUserInfo]
	);
	function resetUserInfo() {
		localStorage.removeItem("access_token");
		setUserInfo({
			authenticated: false,
			information: {
				name: "",
			},
		});
	}

	const [current, setCurrent] = useState("home");

	useEffect(() => {
		const accessToken = localStorage.getItem("access_token");
		if (accessToken) {
			refreshUserInfo(accessToken); // Gọi hàm refresh nếu có access token
		} else {
			resetUserInfo();
		}
	}, [refreshUserInfo]);

	return isLoading ? (
		<div
			style={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Flex align="center" justify="center" gap="middle">
				<Spin />
				<Paragraph style={{ margin: 0 }}>Waiting...</Paragraph>
			</Flex>
		</div>
	) : (
		<AppContext.Provider
			value={{
				current,
				setCurrent,
				userInfo,
				refreshUserInfo,
				resetUserInfo,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export { AppContext, AppProvider };

// How to import in parents (Offen you wrap it in app.js):
// <AppProvider></AppProvider>

// How to use:
// const {/*id you want*/} = useContext(AppContext)
// Ex: const { add, delete } = useContext(AppContext)
