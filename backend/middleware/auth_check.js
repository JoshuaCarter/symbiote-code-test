'use strict';

module.exports = function () {
	return (req, res, next) => {
		//if not logged in
		if (!req.session || !req.session.authorized) {
			console.log('unauthorized: ' + req.sessionID);

			//cancel route
			res.statusCode = 401;
			res.statusMessage = 'Unauthenticated';
			res.setHeader('Content-type', 'text/plain');
			res.send("You must login to access this content.");
		}
		else {
			console.log('authorized: ' + req.sessionID);

			//contiue route
			next();
		}
	};
}