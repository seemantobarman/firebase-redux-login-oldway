import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";

//initial store
const initialStore = {
	userName: null,
	userEmail: null,
};

//action logger middlerware
const logger = (store) => (next) => (action) => {
	console.log("Dispatching--->", action);
	console.log("State Before--->", store.getState());
	next(action);
	console.log("State After--->", store.getState());
};

const store = createStore(reducer, initialStore, applyMiddleware(logger));

export default store;
