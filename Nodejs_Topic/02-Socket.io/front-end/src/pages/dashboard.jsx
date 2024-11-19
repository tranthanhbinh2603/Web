import { useNavigate } from "react-router-dom";
import { Button, Table } from "antd";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import openSocket from "socket.io-client";
import { notification } from "antd";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const columns = [
	{
		title: "Index",
		dataIndex: "Index",
		key: "Index",
		width: 20,
	},
	{
		title: "Comment",
		dataIndex: "Comment",
		key: "Comment",
	},
];

const Dashboard = () => {
	const navigate = useNavigate();

	//Không tự động cập nhật
	// const [data, setData] = useState();
	// useEffect(() => {
	// 	async function getData() {
	// 		const response = await axios.get("http://localhost:5050/comment/");
	// 		const comments = response.data;
	// 		const result = comments.map((comment, index) => {
	// 			return {
	// 				key: index + 1,
	// 				Index: index + 1,
	// 				Comment: comment,
	// 			};
	// 		});
	// 		setData(result);
	// 	}
	// 	getData();
	// }, []);

	//Cách 1: Sử dụng React Query
	// async function getData() {
	// 	const response = await axios.get("http://localhost:5050/comment/");
	// 	const comments = response.data;
	// 	const result = comments.map((comment, index) => {
	// 		return {
	// 			key: index + 1,
	// 			Index: index + 1,
	// 			Comment: comment,
	// 		};
	// 	});
	// 	return result; // Trả về kết quả
	// }
	// const { data } = useQuery({
	// 	queryKey: ["comments"],
	// 	queryFn: getData,
	// });

	//Cách 2: Sử dụng socket.io
	const socketRef = useRef(null);
	const [data, setData] = useState();
	useEffect(() => {
		if (!socketRef.current) {
			socketRef.current = openSocket("http://localhost:5050/");
		}
		socketRef.current.on("comment", async (data) => {
			if (data.action === "create") {
				notification.success({
					message: "Create comment successfully.",
				});
				const response = await axios.get("http://localhost:5050/comment/");
				const comments = response.data;
				const result = comments.map((comment, index) => {
					return {
						key: index + 1,
						Index: index + 1,
						Comment: comment,
					};
				});
				setData(result);
			}
		});
		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
				socketRef.current = null;
			}
		};
	}, []);
	useEffect(() => {
		async function getData() {
			const response = await axios.get("http://localhost:5050/comment/");
			const comments = response.data;
			const result = comments.map((comment, index) => {
				return {
					key: index + 1,
					Index: index + 1,
					Comment: comment,
				};
			});
			setData(result);
		}
		getData();
	}, []);

	return (
		<div
			style={{
				padding: 48,
			}}
		>
			<Button
				style={{ marginBottom: 20 }}
				type="primary"
				onClick={() => {
					navigate("/");
				}}
			>
				Add comment
			</Button>
			<Table
				columns={columns}
				pagination={{
					position: ["bottomRight"],
				}}
				dataSource={data}
			/>
		</div>
	);
};
export default Dashboard;
