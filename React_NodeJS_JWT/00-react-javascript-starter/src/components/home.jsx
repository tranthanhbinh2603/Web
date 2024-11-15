/* eslint-disable react/prop-types */
import { Typography } from "antd";
const { Title, Paragraph } = Typography;
import { Flex } from "antd";

function Home({ setCurrent }) {
	setCurrent("home");
	return (
		<Typography>
			<Flex justify="center" align="center" vertical="true">
				<Title>Welcome to JWT Project (React and Node.JS)</Title>
				<Paragraph>
					This JWT Project, built with React and Node.js, aims to streamline
					development by reducing design inconsistencies and redundant
					implementations, making it easier for designers and developers to
					collaborate efficiently.
				</Paragraph>
			</Flex>
		</Typography>
	);
}

export default Home;
