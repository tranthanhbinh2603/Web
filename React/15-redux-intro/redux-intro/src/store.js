// import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/account/AccountSlice";
import balanceReducer from "./features/balance/BalanceSlice";
// import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "@redux-devtools/extension";
import { configureStore } from "@reduxjs/toolkit";

// const reducer = combineReducers({
// 	account: accountReducer,
// 	balance: balanceReducer,
// });

// const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

// const store = configureStore({
// 	reducer: {
// 		account: accountReducer,
// 		balance: balanceReducer,
// 	},
// 	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(), // Thunk middleware đã được bao gồm sẵn
// 	devTools: process.env.NODE_ENV !== "production", // DevTools sẽ tự động được kích hoạt nếu bạn không ở môi trường production
// });

const store = configureStore({
	reducer: {
		account: accountReducer,
		balance: balanceReducer,
	},
});

export default store;
