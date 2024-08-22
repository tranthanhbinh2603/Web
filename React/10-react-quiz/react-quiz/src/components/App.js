import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Question from "./question/Question";
import Progress from "./Progress";
import Finish from "./Finish";
import { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";

export default function App() {
	const { currentStatus } = useContext(QuizContext);
	return (
		<>
			<Header />
			{currentStatus === "loading" && <Loader />}
			{currentStatus === "error" && <Error />}
			{currentStatus === "finishStart" && <Start />}
			{currentStatus === "active" && (
				<>
					<Progress />
					<Question />
				</>
			)}
			{currentStatus === "finishTest" && <Finish />}
		</>
	);
}
