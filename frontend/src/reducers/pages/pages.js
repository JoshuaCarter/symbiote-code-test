import axios from 'axios';

// DEFAULT STATE
const defaults = {
	page_list: [],
	page: null,
	editing: false,
	making: false,

	list_requested: false,
	create_requested: false,
	read_requested: false,
	update_requested: false,
	delete_requested: false,
}

// HELPERS
function blankPage() {
	return {
		title: '',
		content: '',
	}
}

// REDUCER
export default function reducer(state = defaults, action) {
	switch (action.type) {
		// LIST
		case 'LIST_REQUEST': {
			return { ...state, list_requested: true };
		}
		case 'LIST_SUCCESS': {
			return { ...state, list_requested: false, page_list: action.payload };
		}
		case 'LIST_FAILURE': {
			return { ...state, list_requested: false };
		}
		// EDIT
		case 'EDIT_PAGE': {
			return { ...state, editing: true };
		}
		case 'EDIT_CANCEL': {
			return { ...state, editing: false };
		}
		// MAKE
		case 'MAKE_PAGE': {
			return { ...state, making: true, editing: true, page: blankPage() };
		}
		case 'MAKE_CANCEL': {
			return { ...state, making: false, editing: false, page: null };
		}
		// CREATE
		case 'CREATE_REQUEST': {
			return { ...state, create_requested: true, editing: false, making: false };
		}
		case 'CREATE_SUCCESS': {
			return { ...state, create_requested: false, page: null };
		}
		case 'CREATE_FAILURE': {
			return { ...state, create_requested: false, editing: true, making: true };
		}
		// READ
		case 'READ_REQUEST': {
			return { ...state, read_requested: true, editing: false, making: false };
		}
		case 'READ_SUCCESS': {
			return { ...state, read_requested: false, page: action.payload };
		}
		case 'READ_FAILURE': {
			return { ...state, read_requested: false };
		}
		// UPDATE
		case 'UPDATE_REQUEST': {
			return { ...state, update_requested: true, editing: false };
		}
		case 'UPDATE_SUCCESS': {
			return { ...state, update_requested: false };
		}
		case 'UPDATE_FAILURE': {
			return { ...state, update_requested: false };
		}
		// DELETE
		case 'DELETE_REQUEST': {
			return { ...state, delete_requested: true, editing: false };
		}
		case 'DELETE_SUCCESS': {
			return { ...state, delete_requested: false, page: null };
		}
		case 'DELETE_FAILURE': {
			return { ...state, delete_requested: false };
		}
		// DEFAULT
		default: {
			return state;
		}
	}
}

// LIST
export function getPagesList() {
	return (dispatch) => {
		dispatch({ type: 'LIST_REQUEST' });

		axios.get('pages')
			.then((res) => {
				//got pages
				if (res.status === 200) {
					dispatch({ type: 'LIST_SUCCESS', payload: res.data.pages });
				}
			})
			.catch((err) => {
				dispatch({ type: 'LIST_FAILURE' });
			});
	};
}

// EDIT
export function editPage() {
	return (dispatch) => {
		dispatch({ type: 'EDIT_PAGE' });
	};
}

export function editCancel() {
	return (dispatch) => {
		dispatch({ type: 'EDIT_CANCEL' });
	};
}

// MAKE
export function makePage() {
	return (dispatch) => {
		dispatch({ type: 'MAKE_PAGE' });
	};
}

export function makeCancel() {
	return (dispatch) => {
		dispatch({ type: 'MAKE_CANCEL' });
	};
}

// READ
export function readPage(page) {
	return (dispatch) => {
		dispatch({ type: 'READ_REQUEST' });

		axios.get('pages/' + page)
			.then((res) => {
				//got page
				if (res.status === 200) {
					dispatch({ type: 'READ_SUCCESS', payload: res.data });
				}
			})
			.catch((err) => {
				dispatch({ type: 'READ_FAILURE' });
				if (err.response.status === 401) {
					dispatch({ type: 'MODAL_OPEN' });
				}
				if (err.response.status === 404) {
					//not found
				}
			});
	};
}

// CREATE
export function createPage(title, content) {
	return (dispatch) => {
		dispatch({ type: 'CREATE_REQUEST' });

		let data = {
			title: title,
			content: content
		};
		axios.post('pages/' + title, data)
			.then((res) => {
				if (res.status === 201) {
					dispatch({ type: 'CREATE_SUCCESS' });
					getPagesList()(dispatch);
				}
			})
			.catch((err) => {
				dispatch({ type: 'CREATE_FAILURE' });
				if (err.response.status === 401) {
					dispatch({ type: 'MODAL_OPEN' });
				}
				if (err.response.status === 409) {
					//conflict
				}
			});
	};
}

// UPDATE
export function updatePage(page, title, content) {
	return (dispatch) => {
		dispatch({ type: 'UPDATE_REQUEST' });

		let data = {
			title: title,
			content: content
		};

		axios.put('pages/' + page, data)
			.then((res) => {
				if (res.status === 200) {
					dispatch({ type: 'UPDATE_SUCCESS' });
					readPage(title)(dispatch);
					getPagesList()(dispatch);
				}
			})
			.catch((err) => {
				dispatch({ type: 'UPDATE_FAILURE' });
				if (err.response.status === 401) {
					dispatch({ type: 'MODAL_OPEN' });
				}
				if (err.status === 404) {
					//not found
				}
			});
	};
}

// DELETE
export function deletePage(page) {
	return (dispatch) => {
		dispatch({ type: 'DELETE_REQUEST' });

		axios.delete('pages/' + page)
			.then((res) => {
				if (res.status === 200) {
					dispatch({ type: 'DELETE_SUCCESS' });
					getPagesList()(dispatch);
				}
			})
			.catch((err) => {
				dispatch({ type: 'DELETE_FAILURE' });
				if (err.status === 401) {
					dispatch({ type: 'MODAL_OPEN' });
				}
				if (err.status === 404) {
					//not found
				}
			});
	};
}