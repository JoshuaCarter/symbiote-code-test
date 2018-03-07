import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// redux
import { Provider } from 'react-redux';
import store from './store.js'

// all requests use credentials (for sessions)
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8080/";

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();