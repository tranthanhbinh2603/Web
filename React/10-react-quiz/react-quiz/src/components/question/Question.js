import Options from "./Options";
import NextQuestion from "./NextQuestion";
import Footer from "../Footer";
import Timer from "./Timer";
import { useContext } from "react";
import { QuizContext } from "../../contexts/QuizContext";

function Question() {
	const { question } = useContext(QuizContext);
	return (
		<div className="question">
			<h4>{question.question}</h4>
			<Options
				options={question.options}
				correctOption={question.correctOption}
			/>

			<Footer>
				<Timer />
				<NextQuestion />
			</Footer>
		</div>
	);
}

export default Question;
