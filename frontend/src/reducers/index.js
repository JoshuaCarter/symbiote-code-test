import { combineReducers } from 'redux';
//reducers
import auth from './auth';
import pages from './pages';

export default combineReducers({
	auth: auth.default,
	pages: pages.default,
});