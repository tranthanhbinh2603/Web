export default function Start({ numberQuestions, dispatch }) {
	return (
		<div className="start">
			<h2>Welcome to The React Quiz!</h2>
			<h3>{numberQuestions} questions to test your react mastery</h3>
			<button className="btn" onClick={() => dispatch({ type: "startQuiz" })}>
				Let's start
			</button>
		</div>
	);
}
