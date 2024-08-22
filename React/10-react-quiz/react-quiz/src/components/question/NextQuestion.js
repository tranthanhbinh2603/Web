import { useContext } from "react";
import { QuizContext } from "../../contexts/QuizContext";

export default function NextQuestion() {
	const { dispatch, currentAnswer, currentQuestion, numberQuestions } =
		useContext(QuizContext);
	if (currentAnswer !== null) {
		if (currentQuestion < numberQuestions - 1)
			return (
				<button
					className="btn"
					onClick={() => dispatch({ type: "nextQuestion" })}
				>
					Next
				</button>
			);
		if (currentQuestion === numberQuestions - 1)
			return (
				<button
					className="btn"
					onClick={() => dispatch({ type: "finishTest" })}
				>
					Finish
				</button>
			);
	}
}
