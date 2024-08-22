import { createSlice } from "@reduxjs/toolkit";

const initialAccountState = {
	fullName: "",
	nationalID: "",
	createAt: "",
};

function formatDate() {
	var date = new Date(Date.now());

	var day = ("0" + date.getDate()).slice(-2);
	var month = ("0" + (date.getMonth() + 1)).slice(-2); // Tháng trong JavaScript tính từ 0-11
	var year = date.getFullYear();

	var hours = ("0" + date.getHours()).slice(-2);
	var minutes = ("0" + date.getMinutes()).slice(-2);
	var seconds = ("0" + date.getSeconds()).slice(-2);

	return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

const accountSlice = createSlice({
	name: "account",
	initialState: initialAccountState,
	reducers: {
		createAccount: {
			prepare(name, nationalID) {
				return {
					payload: { name, nationalID },
				};
			},
			reducer(state, action) {
				state.fullName = action.payload.name;
				state.nationalID += action.payload.nationalID;
				state.createAt = formatDate();
			},
		},
		editName(state, action) {
			state.fullName = action.payload;
		},
		editNationalID(state, action) {
			state.nationalID = action.payload;
		},
	},
});

export const { createAccount, editName, editNationalID } = accountSlice.actions;

export default accountSlice.reducer;

// const ACCOUNT_CREATE = "account/createAccount";
// const ACCOUNT_EDIT_NAME = "account/editName";
// const ACCOUNT_EDIT_NATIONAL_ID = "account/editNationalID";

// const initialAccountState = {
// 	fullName: "",
// 	nationalID: "",
// 	createAt: "",
// };

// function formatDate() {
// 	var date = new Date(Date.now());

// 	var day = ("0" + date.getDate()).slice(-2);
// 	var month = ("0" + (date.getMonth() + 1)).slice(-2); // Tháng trong JavaScript tính từ 0-11
// 	var year = date.getFullYear();

// 	var hours = ("0" + date.getHours()).slice(-2);
// 	var minutes = ("0" + date.getMinutes()).slice(-2);
// 	var seconds = ("0" + date.getSeconds()).slice(-2);

// 	return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
// }

// export default function accountReducer(state = initialAccountState, action) {
// 	switch (action.type) {
// 		case "account/createAccount":
// 			return {
// 				...state,
// 				fullName: action.payload.name,
// 				nationalID: action.payload.nationalID,
// 				createAt: formatDate(),
// 			};
// 		case "account/editName":
// 			return {
// 				...state,
// 				fullName: action.payload,
// 			};
// 		case "account/editNationalID":
// 			return {
// 				...state,
// 				nationalID: action.payload,
// 			};
// 		default:
// 			return state;
// 	}
// }

// export function createAccount(name, nationalID) {
// 	return { type: ACCOUNT_CREATE, payload: { name, nationalID } };
// }

// export function editName(name) {
// 	return { type: ACCOUNT_EDIT_NAME, payload: name };
// }

// export function editNationalID(id) {
// 	return { type: ACCOUNT_EDIT_NATIONAL_ID, payload: id };
// }
