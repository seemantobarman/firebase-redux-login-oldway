import { createStore } from "redux";
import reducer from "./reducer";

//initial store
const initialStore = {
	userName: null,
	userEmail: null,
};

const store = createStore(reducer, initialStore);

export default store;
