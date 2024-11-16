/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { Flex, Space, Spin, Table } from "antd";
import axiosInstance, { setNavigate } from "../utils/axios.interceptor";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contextAPI/AppAPI";
import { Typography } from "antd";
const { Paragraph } = Typography;

function Users() {
	const { setCurrent } = useContext(AppContext);
	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setCurrent("users");
		setNavigate(navigate);
		const jwtToken = localStorage.getItem("access_token");
		if (!jwtToken) {
			setIsAuthenticated(false);
			navigate("/login");
		}
	}, [navigate, setCurrent]);
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => {
				if (record.role !== "Admin") {
					return (
						<Space size="middle">
							<a>Delete {record.name}</a>
						</Space>
					);
				} else {
					return null;
				}
			},
		},
	];

	async function getData() {
		const data = axiosInstance.get("/v1/api/users");
		return data;
	}

	const { data } = useQuery({
		queryKey: ["users"],
		queryFn: getData,
		enabled: isAuthenticated,
		onSuccess: () => {
			setIsLoading(false);
		},
	});

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
		<Table
			columns={columns}
			dataSource={data}
			style={{ padding: 48 }}
			pagination={{
				position: ["none", "none"],
			}}
		/>
	);
}

export default Users;
