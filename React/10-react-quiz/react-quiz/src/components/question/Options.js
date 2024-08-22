import { useContext } from "react";
import { QuizContext } from "../../contexts/QuizContext";

function Options({ options, correctOption }) {
	const { dispatch, currentAnswer } = useContext(QuizContext);
	const isHaveAnswer = currentAnswer !== null;
	return (
		<div className="options">
			{options.map((option, index) => {
				return (
					<button
						className={`btn btn-option ${
							index === currentAnswer ? "answer" : ""
						} ${
							isHaveAnswer
								? correctOption === index
									? "correct"
									: "wrong"
								: ""
						}`}
						key={option}
						onClick={() => dispatch({ type: "newAnswer", payload: index })}
						disabled={isHaveAnswer}
					>
						{option}
					</button>
				);
			})}
		</div>
	);
}

export default Options;
