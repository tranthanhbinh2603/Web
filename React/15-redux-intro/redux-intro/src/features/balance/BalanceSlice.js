import { createSlice } from "@reduxjs/toolkit";

const initialBalanceState = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
	isLoading: false,
};

const balanceSlice = createSlice({
	name: "account",
	initialState: initialBalanceState,
	reducers: {
		deposit(state, action) {
			state.balance += action.payload;
			state.isLoading = false;
		},
		withdraw(state, action) {
			state.balance -= action.payload;
		},
		requestLoan: {
			prepare(value, purpose) {
				return {
					payload: { value, purpose },
				};
			},
			reducer(state, action) {
				state.loan = action.payload.value;
				state.balance += action.payload.value;
				state.loanPurpose = action.payload.purpose;
			},
		},
		payLoan(state) {
			state.balance -= state.loan;
			state.loan = 0;
			state.loanPurpose = "";
		},
		isGettingPrice(state) {
			state.isLoading = true;
		},
	},
});

export const { withdraw, requestLoan, payLoan } = balanceSlice.actions;

export function deposit(value, currency) {
	if (currency === "USD") return { type: "account/deposit", payload: value };
	return async function (dispatch) {
		dispatch({ type: "account/isGettingPrice" });
		const dataFetch = await fetch(
			`https://api.frankfurter.app/latest?amount=${value}&from=${currency}&to=USD`
		);
		const res = await dataFetch.json();
		dispatch({ type: "account/deposit", payload: res.rates.USD });
	};
}

export default balanceSlice.reducer;

/* Không dùng react toolkit */

// const ACCOUNT_CHANGE_BALANCE = "balance/changeBalance";
// const ACCOUNT_CONVERTING_CURRENCY = "balance/convertingCurrency";
// const ACCOUNT_REQUEST_LOAN = "balance/requestLoan";
// const ACCOUNT_PAY_LOAN = "balance/payLoan";

// export default function balanceReducer(state = initialBalanceState, action) {
// 	switch (action.type) {
// 		case "balance/changeBalance":
// 			return {
// 				...state,
// 				balance: state.balance + action.payload,
// 				isLoading: false,
// 			};
// 		case "balance/requestLoan":
// 			return {
// 				...state,
// 				loan: action.payload.value,
// 				balance: state.balance + action.payload.value,
// 				loanPurpose: action.payload.purpose,
// 			};
// 		case "balance/payLoan":
// 			return {
// 				...state,
// 				balance: state.balance - state.loan,
// 				loan: 0,
// 				loanPurpose: "",
// 			};
// 		case "balance/convertingCurrency":
// 			return {
// 				...state,
// 				isLoading: true,
// 			};
// 		default:
// 			return state;
// 	}
// }

// export function deposit(value, currency) {
// 	if (currency === "USD")
// 		return { type: ACCOUNT_CHANGE_BALANCE, payload: value };
// 	//Nhớ cài redux thunk
// 	//const store = createStore(reducer, applyMiddleware(thunk));
// 	return async function (dispatch) {
// 		dispatch({ type: ACCOUNT_CONVERTING_CURRENCY });
// 		const dataFetch = await fetch(
// 			`https://api.frankfurter.app/latest?amount=${value}&from=${currency}&to=USD`
// 		);
// 		const res = await dataFetch.json();
// 		dispatch({ type: ACCOUNT_CHANGE_BALANCE, payload: res.rates.USD });
// 	};
// }

// export function withdraw(value) {
// 	return { type: ACCOUNT_CHANGE_BALANCE, payload: -value };
// }

// export function requestLoan(value, purpose) {
// 	return {
// 		type: ACCOUNT_REQUEST_LOAN,
// 		payload: { value: value, purpose: purpose },
// 	};
// }

// export function payLoan() {
// 	return { type: ACCOUNT_PAY_LOAN };
// }

// import { createSlice } from "@reduxjs/toolkit";
