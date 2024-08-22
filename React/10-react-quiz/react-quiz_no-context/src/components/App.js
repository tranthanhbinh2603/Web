import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Question from "./question/Question";
import Progress from "./Progress";
import Finish from "./Finish";
import { useReducer, useEffect } from "react";

const initState = {
	questions: [],
	currentStatus: "loading",
	currentQuestion: 1,
	currentAnswer: null,
	score: 0,
	highScore: 0,
	remainingSecond: null,
};

const durationPerQuestion = 30;

function reducer(state, action) {
	switch (action.type) {
		case "finishLoading":
			return {
				...state,
				currentStatus: "finishStart",
				questions: action.payload,
			};
		case "errorLoading":
			return { ...state, currentStatus: "error" };
		case "startQuiz":
			return {
				...state,
				currentStatus: "active",
				remainingSecond: durationPerQuestion * state.questions.length,
			};
		case "newAnswer":
			const question = state.questions.at(state.currentQuestion);
			return {
				...state,
				currentAnswer: action.payload,
				score:
					question.correctOption === action.payload
						? state.score + question.points
						: state.score,
			};
		case "nextQuestion":
			return {
				...state,
				currentAnswer: null,
				currentQuestion: state.currentQuestion + 1,
			};
		case "finishTest":
			return {
				...state,
				currentStatus: "finishTest",
				highScore:
					state.highScore < state.score ? state.score : state.highScore,
			};
		case "restart":
			return {
				...state,
				currentStatus: "active",
				currentQuestion: 1,
				currentAnswer: null,
				score: 0,
				remainingSecond: durationPerQuestion * state.questions.length,
			};
		case "tick":
			return {
				...state,
				remainingSecond:
					state.remainingSecond > 1 ? state.remainingSecond - 1 : 0,
				currentStatus: state.remainingSecond <= 1 ? "finishTest" : "active",
				highScore:
					state.highScore < state.score ? state.score : state.highScore,
			};
		default:
			throw new Error("Not valid type reducer");
	}
}

export default function App() {
	const [
		{
			currentStatus,
			questions,
			currentQuestion,
			currentAnswer,
			score,
			highScore,
			remainingSecond,
		},
		dispatch,
	] = useReducer(reducer, initState);

	const possibleScore = questions.reduce(
		(sum, question) => sum + question.points,
		0
	);

	useEffect(() => {
		fetch("http://localhost:8000/questions")
			.then((res) => res.json())
			.then((data) => {
				dispatch({ type: "finishLoading", payload: data });
			})
			.catch(() => {
				dispatch({ type: "errorLoading" });
			});
	}, []);

	const numberQuestions = questions.length;

	return (
		<>
			<Header />
			{currentStatus === "loading" && <Loader />}
			{currentStatus === "error" && <Error />}
			{currentStatus === "finishStart" && (
				<Start numberQuestions={numberQuestions} dispatch={dispatch} />
			)}
			{currentStatus === "active" && (
				<>
					<Progress
						possibleScore={possibleScore}
						currentScore={score}
						numberQuestions={numberQuestions}
						currentQuestion={currentQuestion}
					/>
					<Question
						question={questions.at(currentQuestion)}
						dispatch={dispatch}
						currentAnswer={currentAnswer}
						currentQuestion={currentQuestion}
						numberQuestions={numberQuestions}
						remainingSecond={remainingSecond}
					/>
				</>
			)}
			{currentStatus === "finishTest" && (
				<Finish
					possibleScore={possibleScore}
					currentScore={score}
					highScore={highScore}
					dispatch={dispatch}
				/>
			)}
		</>
	);
}
