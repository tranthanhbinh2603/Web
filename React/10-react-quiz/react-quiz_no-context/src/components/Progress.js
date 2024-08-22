function Progress({
	possibleScore,
	currentScore,
	numberQuestions,
	currentQuestion,
}) {
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
