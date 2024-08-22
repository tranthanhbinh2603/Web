import { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";

function Progress() {
	const { possibleScore, currentScore, numberQuestions, currentQuestion } =
		useContext(QuizContext);
	return (
		<header className="progress">
			<progress max={possibleScore} value={currentScore}></progress>
			<p>
				Question <strong>{currentQuestion}</strong>/{numberQuestions}
			</p>
			<p>
				<strong>{currentScore}</strong>/{possibleScore}
			</p>
		</header>
	);
}

export default Progress;
