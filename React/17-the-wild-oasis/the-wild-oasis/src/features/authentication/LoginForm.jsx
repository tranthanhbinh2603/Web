import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { login } from "../../services/apiLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { isLoading: isLogin, mutate: loginFn } = useMutation({
		mutationFn: ({ email, password }) => login(email, password),
		onSuccess: (user) => {
			//Thực ra là lấy kết quả của thằng mutationFn ở trên
			navigate("/dashboard");
			queryClient.setQueryData(["user"], user);
			toast.success("Login successful");
		},
		onError: () => {
			toast.error("Login failed");
		},
	});

	function handleLogin(e) {
		e.preventDefault();
		loginFn(
			{ email: email, password: password },
			{
				onSettled: () => {
					setEmail("");
					setPassword("");
				},
			}
		);
	}

	return (
		<Form onSubmit={handleLogin}>
			<FormRowVertical label="Email address">
				<Input
					type="email"
					id="email"
					// This makes this form better for password managers
					autoComplete="username"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={isLogin}
				/>
			</FormRowVertical>
			<FormRowVertical label="Password">
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					disabled={isLogin}
				/>
			</FormRowVertical>
			<FormRowVertical>
				<Button size="large" disabled={isLogin}>
					Login
				</Button>
			</FormRowVertical>
		</Form>
	);
}

export default LoginForm;
