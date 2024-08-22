export default function NextQuestion({
	dispatch,
	currentAnswer,
	currentQuestion,
	numberQuestions,
}) {
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
