import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { notification } from "antd";
const { TextArea } = Input;

function Home() {
	const navigate = useNavigate();
	const onFinish = async (values) => {
		try {
			const { comment } = values;
			if (comment.length < 10) {
				return notification.error({
					message: "Create comment failed.",
					description: "Comment length need more than 10 letters.",
				});
			}
			if (comment.length > 500) {
				return notification.error({
					message: "Create comment failed.",
					description: "Comment length need less than 500 letters.",
				});
			}
			await axios.post("http://localhost:5050/comment", {
				comment,
			});
			notification.success({
				message: "Create comment successful.",
			});
		} catch (error) {
			notification.error({
				message: "Create comment failed.",
				description: "Please try again.",
			});
		}
	};
	return (
		<>
			<Form
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 14,
				}}
				layout="horizontal"
				style={{
					maxWidth: 600,
					margin: 48,
				}}
				onFinish={onFinish}
			>
				<Form.Item label="Your comment: " name="comment">
					<TextArea rows={4} />
				</Form.Item>
				<Form.Item label={null}>
					<Button
						type="primary"
						htmlType="submit"
						style={{
							marginRight: 10,
						}}
					>
						Submit
					</Button>
					<Button
						htmlType="submit"
						onClick={() => {
							navigate("/dashboard");
						}}
					>
						Go to dashboard
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}
export default Home;
