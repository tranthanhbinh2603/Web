import { useContext, useEffect } from "react";
import { QuizContext } from "../../contexts/QuizContext";

function Timer() {
	const { dispatch, remainingSecond } = useContext(QuizContext);
	const minutes = Math.floor(remainingSecond / 60);
	const second = remainingSecond % 60;
	useEffect(
		function () {
			const id = setInterval(function () {
				dispatch({ type: "tick" });
			}, 1000);
			return () => clearInterval(id);
		},
		[dispatch]
	);
	return (
		<div className="timer">
			{minutes < 10 ? 0 : ""}
			{minutes}:{second < 10 ? 0 : ""}
			{second}
		</div>
	);
}

export default Timer;
