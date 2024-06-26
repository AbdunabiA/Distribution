import { createSlice } from "@reduxjs/toolkit";
import storage from "services/storage";

const initialState = {
	isFetched: false,
	isAuthenticated: false,
	data: {},
	token: storage.get("token"),
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signIn: (state, action) => {
			return {
				...state,
				isFetched: true,
				isAuthenticated: action.payload.isAuthenticated,
				token: action.payload.access,
				data: action.payload.user,
			};
		},
		signOut: state => {
			return {
				...state,
				isFetched: true,
				isAuthenticated: false,
				token: null,
				data: {}
			};
		},
		getMe: (state, action) => {
			return {
				...state,
				isFetched: true,
				isAuthenticated: true,
				data: action.payload
			};
		},
		changeRole:(state, action)=>{
			return {
				...state,
				isFetched: true,
				isAuthenticated: true,
				token: null,
				data: {},
			};
		}
	}
});

// Action creators are generated for each case reducer function
export const { signIn, signOut, getMe, changeRole } = authSlice.actions;

export default authSlice.reducer;


