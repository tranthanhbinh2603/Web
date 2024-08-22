import { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";

function Finish() {
	const { possibleScore, currentScore, highScore, dispatch } =
		useContext(QuizContext);
	const percentage = parseFloat(
		((currentScore / possibleScore) * 100).toFixed(2)
	);
	let emoji;
	if (percentage === 100) emoji = "🥇";
	if (percentage >= 80 && percentage < 100) emoji = "🎉";
	if (percentage >= 50 && percentage < 80) emoji = "🙃";
	if (percentage >= 0 && percentage < 50) emoji = "🤨";
	if (percentage === 0) emoji = "🤦‍♂️";
	return (
		<>
			<p className="result">
				{emoji} You scored {currentScore} points of of {possibleScore} (
				{percentage}%)
			</p>
			<p className="highscore">(High score: {highScore})</p>
			<button className="btn" onClick={() => dispatch({ type: "restart" })}>
				Restart
			</button>
		</>
	);
}

export default Finish;
