'use strict';

exports.authcheck = function (req, res) {
	console.log('auth check: ' + req.sessionID);

	let auth = false;
	if (req.session && req.session.authorized) {
		auth = true;
	}

	res.statusCode = 200;
	res.statusMessage = 'OK';
	res.setHeader('Content-type', 'application/json');
	res.json({ authorized: auth });
}

exports.login = function (req, res) {
	let username = req.body.username;
	let password = req.body.password;

	//login successful
	if (username === 'admin' && password === 'admin') {
		console.log('login success: ' + req.sessionID);

		req.session.authorized = true;

		res.statusCode = 200;
		res.statusMessage = 'OK';
		res.setHeader('Content-type', 'text/plain');
		res.send("Login successful.");
	}
	//login failed
	else {
		console.log('login failure: ' + req.sessionID);

		res.statusCode = 401;
		res.statusMessage = 'Unauthenticated';
		res.setHeader('Content-type', 'text/plain');
		res.send("Username or password incorrect.");
	}
}

exports.logout = function (req, res) {
	//logout successful
	if (req.session.authorized) {
		console.log('logout success: ' + req.sessionID);

		req.session.authorized = false;

		res.statusCode = 200;
		res.statusMessage = 'OK';
		res.setHeader('Content-type', 'text/plain');
		res.send("Logged out successfully.");
	}
	//logout failed
	else {
		console.log('logout failure: ' + req.sessionID);

		res.statusCode = 204;
		res.statusMessage = 'No Content';
		res.setHeader('Content-type', 'text/plain');
		res.send("Logout failed, user was not logged in.");
	}
}