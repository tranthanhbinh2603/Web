import Options from "./Options";
import NextQuestion from "./NextQuestion";
import Footer from "../Footer";
import Timer from "./Timer";

function Question({
	question,
	dispatch,
	currentAnswer,
	currentQuestion,
	numberQuestions,
	remainingSecond,
}) {
	return (
		<div className="question">
			<h4>{question.question}</h4>
			<Options
				options={question.options}
				dispatch={dispatch}
				currentAnswer={currentAnswer}
				correctOption={question.correctOption}
			/>

			<Footer>
				<Timer dispatch={dispatch} remainingSecond={remainingSecond}></Timer>
				<NextQuestion
					dispatch={dispatch}
					currentAnswer={currentAnswer}
					currentQuestion={currentQuestion}
					numberQuestions={numberQuestions}
				/>
			</Footer>
		</div>
	);
}

export default Question;
