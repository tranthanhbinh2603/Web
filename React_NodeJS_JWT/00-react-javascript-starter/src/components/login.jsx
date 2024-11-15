/* eslint-disable react/prop-types */
import { Button, Checkbox, Form, Input } from "antd";
import { useEffect } from "react";

const onFinish = (values) => {
	console.log("Success:", values);
};

const Login = ({ setCurrent }) => (
	useEffect(() => {
		setCurrent("login");
	}, []),
	(
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
				label="Username"
				name="username"
				style={{ marginBottom: 24 }}
				rules={[
					{
						required: true,
						message: "Please input your username!",
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

			<Form.Item name="remember" label={null} valuePropName="checked">
				<Checkbox>Remember me</Checkbox>
			</Form.Item>

			<Form.Item label={null}>
				<Button type="primary" htmlType="submit">
					Login
				</Button>
			</Form.Item>
		</Form>
	)
);

export default Login;
