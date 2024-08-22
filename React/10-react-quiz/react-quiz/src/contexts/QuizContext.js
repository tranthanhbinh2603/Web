// import { createContext } from "react";

// const CitiesContext = createContext();

// /* eslint-disable react/prop-types */
// function CitiesProvider({ children }) {
// 	//All use, all code below return here
// 	return (
// 		<CitiesContext.Provider
// 			value={
// 				{
// 					//Value here
// 					//Ex: add={handleAdd} => add: handleAdd
// 					//Ex: delete={delete} => delete
// 				}
// 			}
// 		>
// 			{children}
// 		</CitiesContext.Provider>
// 	);
// }

// export { CitiesContext, CitiesProvider };

// // How to import in parents:
// // <CitiesProvider></CitiesProvider>

// // How to use:
// // const {/*id you want*/} = useContext(CitiesContext)
// // Ex: const { add, delete } = useContext(CitiesContext)

import { createContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

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

/* eslint-disable react/prop-types */
function QuizProvider({ children }) {
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
	const question = questions.at(currentQuestion);
	return (
		<QuizContext.Provider
			value={{
				//Value here
				//Ex: add={handleAdd} => add: handleAdd
				//Ex: delete={delete} => delete
				currentStatus,
				possibleScore,
				currentScore: score,
				numberQuestions,
				currentQuestion,
				question,
				dispatch,
				currentAnswer,
				remainingSecond,
				highScore,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
}

export { QuizContext, QuizProvider };
