'use strict';

/**
 * @author: Joshua Carter
 * @description:
 * Simple authentication middleware that checks if a user's
 * session has an authentication flag set and denies access
 * with a 401 if not. This should only be used on routes
 * that require authentication.
 */

module.exports = function () {
	return (req, res, next) => {
		//if not logged in
		if (!req.session || !req.session.authorized) {
			console.log('unauthorized: ' + req.sessionID);

			//deny route
			res.statusCode = 401;
			res.statusMessage = 'Unauthenticated';
			res.setHeader('Content-type', 'text/plain');
			res.send("You must login to access this content.");
		}
		else {
			console.log('authorized: ' + req.sessionID);

			//allow route
			next();
		}
	};
}