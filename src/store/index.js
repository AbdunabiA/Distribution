import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./auth";

const persistConfig = {
	key: "root",
	storage
};

const rootReducer = combineReducers({
	auth: authReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [];


const store = configureStore({
	reducer: persistedReducer,
	middleware
});

const persister = persistStore(store);

export { store, persister };
