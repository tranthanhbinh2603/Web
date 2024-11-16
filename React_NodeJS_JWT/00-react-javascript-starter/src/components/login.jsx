/* eslint-disable react/prop-types */
import { Button, Checkbox, Form, Input, notification, Space } from "antd";
import { useEffect } from "react";
import { useNetwork } from "../customhooks/useNetwork";
import axios, { setNavigate } from "../utils/axios.interceptor";
import { useNavigate } from "react-router-dom";

const Login = ({ setCurrent }) => {
	const [isOnline] = useNetwork();
	const navigate = useNavigate();
	useEffect(() => {
		setNavigate(navigate);
	}, [navigate]);
	const onFinish = async (values) => {
		if (!isOnline) {
			return notification.error({
				message: "You don't have internet connection",
				description: "Please connect internet and try again.",
			});
		}
		const { email, password, keepSignedIn } = values;
		try {
			const data = await axios.post("/v1/api/login", {
				email,
				password,
				keepSignedIn,
			});
			notification.success({
				message: "Login successful.",
			});
			localStorage.setItem("access_token", data.token);
			if (window.history.length > 1) {
				navigate(-1);
			} else {
				navigate("/");
			}
		} catch (error) {
			if (error.code === "ERR_NETWORK") {
				notification.error({
					message: "Connection Failed",
					description:
						"Could not connect to the server. Please check your internet connection or the server status.",
				});
			} else if (error.status === 401) {
				notification.error({
					message: "Wrong credential",
					description: "Please check email or password.",
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
		setCurrent("login");
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

			<Form.Item name="keepSignedIn" label={null} valuePropName="checked">
				<Checkbox>Remember me</Checkbox>
			</Form.Item>

			<Form.Item label={null}>
				<Space>
					<Button type="primary" htmlType="submit">
						Login
					</Button>
					<Button onClick={() => navigate("/register")}>Register</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

export default Login;
