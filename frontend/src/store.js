import { createStore, applyMiddleware } from 'redux';
//middleware
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reduxCatch from 'redux-catch';
//reducers
import reducers from './reducers';

function errorHandler(error, getState, lastAction, dispatch) {
	console.error(error);
}

//combine middleware
const middleware = applyMiddleware(
	thunk,
	createLogger({ collapsed: true }),
	reduxCatch(errorHandler),
);

//make redux store
const store = createStore(reducers, middleware);

export default store;