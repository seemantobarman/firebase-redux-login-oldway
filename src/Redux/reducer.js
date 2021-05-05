import { LOGIN, LOGOUT } from "./actions";

function reducer(state, action) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				userName: action.payload.userName,
				userEmail: action.payload.userEmail,
			};

		case LOGOUT:
			return {
				...state,
				userName: null,
				userEmail: null,
			};

		default:
			return state;
	}
}

export default reducer;
