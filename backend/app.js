'use strict';

const express = require('express');
//middleware
const session = require('express-session');
const cors = require('cors');
const auth_check = require('./middleware/auth_check');
//controllers
const auth = require('./controllers/auth');
const pages = require('./controllers/pages');

//make express app
const app = express();

//create session
app.use(session({
	secret: 'khada',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 3600000, 		//last 1hr
		secure: false 			//not https
	}
}));

//enable CORS
app.use(cors({
	origin: true,		//reflect request origin
	credentials: true	//use header for cookies
}));

//enable json body parser
app.use(express.json());

//default route
app.get('/', (req, res) => {
	res.statusCode = 200;
	res.send("Node.js server is running.");
});

//auth routes
app.get('/authcheck', auth.check);
app.post('/login', auth.login);
app.post('/logout', auth.logout);

//pages routes
app.get('/pages', pages.getList);
app.post('/pages/:page', auth_check(), pages.createPage);
app.get('/pages/:page', auth_check(), pages.readPage);
app.put('/pages/:page', auth_check(), pages.updatePage);
app.delete('/pages/:page', auth_check(), pages.deletePage);

//run app
app.listen(8080, 'localhost');