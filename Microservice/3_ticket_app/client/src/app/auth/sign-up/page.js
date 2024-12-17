"use client";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function SignUpPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = (e) => {
		const dataPost = {
			email,
			password,
		};

		// Chuyển đối tượng thành chuỗi JSON để dễ hiển thị
		alert(JSON.stringify(dataPost, null, 2)); // Thêm tham số `null, 2` để dễ đọc
	};

	return (
		<Container>
			<Row>
				<Col>
					<h1>Sign Up</h1>
					<form onSubmit={onSubmit}>
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
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</form>
				</Col>
			</Row>
		</Container>
	);
}
