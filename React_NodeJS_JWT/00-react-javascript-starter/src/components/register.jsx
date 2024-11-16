/* eslint-disable react/prop-types */
import { Button, Form, Input, Space } from "antd";
import axios from "../utils/axios.interceptor";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useNetwork } from "../customhooks/useNetwork";
import { AppContext } from "../contextAPI/AppAPI";

const Register = () => {
	const { setCurrent } = useContext(AppContext);
	const [isOnline] = useNetwork();
	const navigate = useNavigate();
	const onFinish = async (values) => {
		if (!isOnline) {
			return notification.error({
				message: "You don't have internet connection",
				description: "Please connect internet and try again.",
			});
		}
		const { name, email, password } = values;
		try {
			await axios.post("/v1/api/register", {
				name,
				email,
				password,
			});
			notification.success({
				message: "Create user successful.",
				description: "Please login.",
			});
			navigate("/login");
		} catch (error) {
			if (error.code === "ERR_NETWORK") {
				notification.error({
					message: "Connection Failed",
					description:
						"Could not connect to the server. Please check your internet connection or the server status.",
				});
			} else if (error.status === 400) {
				notification.error({
					message: "User created",
					description: "Please try again with another email.",
				});
			} else {
				notification.error({
					message: "Create user failed",
					description: "Please try again.",
				});
			}
		}
	};
	useEffect(() => {
		setCurrent("register");
	}, [setCurrent]);
	return (
		<Form
			name="basic"
			labelCol={{
				span: 8,
			}}
			wrapperCol={{
				span: 16,
			}}
			style={{
				maxWidth: 600,
				padding: 48,
			}}
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			autoComplete="off"
		>
			<Form.Item
				label="Name"
				name="name"
				style={{ marginBottom: 24 }}
				rules={[
					{
						required: true,
						message: "Please input your name!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Email"
				name="email"
				style={{ marginBottom: 24 }}
				rules={[
					{
						required: true,
						message: "Please input your email!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				style={{ marginBottom: 24 }}
				rules={[
					{
						required: true,
						message: "Please input your password!",
					},
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item label={null}>
				<Space>
					<Button type="primary" htmlType="submit">
						Register now!
					</Button>
					<Button onClick={() => navigate("/login")}>Login</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};
export default Register;
