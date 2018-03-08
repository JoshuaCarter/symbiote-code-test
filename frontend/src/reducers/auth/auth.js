import axios from 'axios';

// DEFAULT STATE
const defaults = {
	modal_open: false,
	logging_in: false,
	logging_out: false,
	authorized: false,		//auth flag
	on_authorized: null, 	//post login action
}

// REDUCER
export default function reducer(state = defaults, action) {
	switch (action.type) {
		case 'AUTH_CHECKED': {
			return { ...state, authorized: action.payload };
		}
		case 'MODAL_OPEN': {
			return { ...state, modal_open: true, authorized: false, on_authorized: action.payload };
		}
		case 'MODAL_CLOSE': {
			return { ...state, modal_open: false };
		}
		case 'LOGIN_REQUEST': {
			return { ...state, logging_in: true };
		}
		case 'LOGIN_SUCCESS': {
			return { ...state, logging_in: false, authorized: true };
		}
		case 'LOGIN_FAILURE': {
			return { ...state, logging_in: false };
		}
		case 'LOGOUT_REQUEST': {
			return { ...state, logging_out: true };
		}
		case 'LOGOUT_SUCCESS': {
			return { ...state, logging_out: false, authorized: false };
		}
		case 'LOGOUT_FAILURE': {
			return { ...state, logging_out: false };
		}
		default: {
			return state;
		}
	}
}

// ACTIONS
export function checkAuth() {
	return (dispatch) => {
		axios.get('authcheck')
			.then((res) => {
				//got auth
				if (res.status === 200) {
					dispatch({ type: 'AUTH_CHECKED', payload: res.data.authorized });
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
}

export function openModal(on_authorized = null) {
	return (dispatch) => {
		dispatch({ type: 'MODAL_OPEN', payload: on_authorized });
	};
}

export function closeModal() {
	return (dispatch) => {
		dispatch({ type: 'MODAL_CLOSE' });
	};
}

export function login(user, pass) {
	return (dispatch) => {
		//login in process
		dispatch({ type: 'LOGIN_REQUEST' });

		//send login request
		let data = {
			username: user,
			password: pass,
		};
		axios.post("login", data)
			.then((res) => {
				//login successful
				if (res.status === 200) {
					dispatch({ type: 'LOGIN_SUCCESS' });
				}
			})
			.catch((err) => {
				//login failure
				if (err.response.status === 401) {
					dispatch({ type: 'LOGIN_FAILURE' });
				}
			});
	};
}

export function logout() {
	return (dispatch) => {
		//logout in process
		dispatch({ type: 'LOGOUT_REQUEST' });

		//send logout request
		axios.post("logout")
			.then((res) => {
				//logout successful
				if (res.status === 200) {
					dispatch({ type: 'LOGOUT_SUCCESS' });
					//hack to unload page and related flags
					dispatch({ type: 'MAKE_CANCEL' });
				}
			})
			.catch((err) => {
				//logout failure
				if (err.response.status === 204) {
					dispatch({ type: 'LOGOUT_FAILURE' });
				}
			});
	};
}