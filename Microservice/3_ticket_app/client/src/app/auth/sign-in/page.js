"use client";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useRequest from "../../../customHook/useRequest";

export default function SignUpPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { data, sendRequest } = useRequest();

	const handleSummit = (e) => {
		e.preventDefault();
		const dataPost = {
			email,
			password,
		};
		sendRequest("/api/users/sign-in", "POST", dataPost, async () => {
			await new Promise((resolve) => setTimeout(resolve, 200));
			document.body.innerHTML = "";
			setTimeout(() => {
				window.location.href = "/";
			}, 200);
		});
	};

	return (
		<Container>
			<Row>
				<Col>
					<h1>Sign In</h1>
					<form onSubmit={(e) => handleSummit(e)}>
						<div className="mb-3">
							<label htmlFor="exampleInputEmail1" className="form-label">
								Email address
							</label>
							<input
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="exampleInputPassword1" className="form-label">
								Password
							</label>
							<input
								type="password"
								className="form-control"
								id="exampleInputPassword1"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>
						{data && data.errors && (
							<div className="alert alert-danger mt-3">
								<p>
									There is some error when login account. It could be due to
									incorrect username or password.
								</p>
							</div>
						)}
						{data && data.msg && (
							<div className="alert alert-success" role="alert">
								Successful Login! We will redirect soon to home page.
							</div>
						)}
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</form>
				</Col>
			</Row>
		</Container>
	);
}
