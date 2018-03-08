'use strict';

//using session obj as global container for pages (kinda bad but fine for this test)
const session = require('express-session');

const pagesDefault = {
	Home: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae ante libero. Aenean scelerisque risus magna, non volutpat metus pulvinar non. Integer rhoncus ante massa, quis cursus tortor luctus sit amet. In vitae nisi sit amet est finibus consectetur. Aenean placerat rutrum sapien vitae dignissim. Aliquam turpis diam, pellentesque sit amet massa et, accumsan auctor eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec vestibulum dui. Curabitur sed egestas augue. Sed egestas sollicitudin faucibus. Donec blandit laoreet condimentum. Maecenas at risus nisl.",
	About: "Pellentesque turpis mauris, consequat vel rhoncus in, rhoncus sit amet augue. Nulla facilisis ex a ipsum consectetur, sit amet tincidunt massa condimentum. In hac habitasse platea dictumst. Curabitur venenatis, felis maximus dictum imperdiet, velit nisi lobortis justo, eu scelerisque enim libero a odio. Nunc non consectetur neque, sed ultrices ante. Etiam porta ultrices mauris, vitae tristique tellus congue at. Nulla ut neque ac tortor cursus efficitur vel vitae odio. Cras consectetur tellus vel leo finibus, ac mollis odio aliquam. Sed sed vehicula magna. Sed est odio, interdum eget interdum eu, dapibus tempus purus. Duis lectus nunc, convallis vel leo sit amet, facilisis finibus mauris.",
	Contact: "Phasellus vehicula eu augue blandit interdum. Phasellus eu odio pharetra, tristique velit nec, aliquet turpis. Praesent ornare sapien eget ante efficitur lacinia. Mauris vehicula auctor odio in sollicitudin. Sed quis lectus tellus. Integer et accumsan turpis. Vivamus pulvinar felis metus, id sagittis turpis ornare sit amet. Phasellus convallis lobortis accumsan. Quisque sit amet dolor at est interdum volutpat. Nam aliquet imperdiet tortor ut molestie. Phasellus tristique purus eget arcu iaculis, sit amet molestie urna auctor. Vestibulum eu justo vitae sem cursus ultricies at in nulla. Ut tristique tristique tellus, eu maximus lacus auctor eget. Phasellus convallis turpis pretium purus maximus, non dapibus mi laoreet. Pellentesque non sollicitudin mi. Vestibulum a mattis nibh."
}

if (!session.pages) {
	session.pages = Object.assign({}, pagesDefault);
}

//GET
exports.getList = function (req, res) {
	console.log('pages list: ' + req.sessionID);

	res.statusCode = 200;
	res.statusMessage = 'OK';
	res.setHeader('Content-type', 'application/json');
	res.json({ pages: Object.keys(session.pages) });
}

//CREATE
exports.createPage = function (req, res) {
	let page = req.params.page;
	let title = req.body.title;
	let content = req.body.content;

	//page already exists (or no title/content)
	if (!page || !title || !content || session.pages[page]) {
		console.log('create page failure: ' + req.sessionID);

		res.statusCode = 409;
		res.statusMessage = 'Conflict';
		res.setHeader('Content-type', 'text/plain');
		res.send("The requested page already exists.");
	}
	//page created
	else {
		console.log('create page success: ' + req.sessionID);

		session.pages[title] = content;

		res.statusCode = 201;
		res.statusMessage = 'Created';
		res.setHeader('Content-type', 'text/plain');
		res.send("The requested page was created.");
	}
}

//READ
exports.readPage = function (req, res) {
	let page = req.params.page;

	//page not found
	if (!session.pages[page]) {
		console.log('read page failure: ' + req.sessionID);

		res.statusCode = 404;
		res.statusMessage = 'Not Found';
		res.setHeader('Content-type', 'text/plain');
		res.send("The requested page could not be found.");
	}
	//page found
	else {
		console.log('read page success: ' + req.sessionID);

		res.statusCode = 200;
		res.statusMessage = 'OK';
		res.setHeader('Content-type', 'application/json');
		let data = {
			title: page,
			content: session.pages[page]
		};
		res.json(data);
	}
}

//UPDATE
exports.updatePage = function (req, res) {
	let page = req.params.page;
	let title = req.body.title;
	let content = req.body.content;

	//page not found (or no title/content)
	if (!title || !content || !session.pages[page]) {
		console.log('update page failure: ' + req.sessionID);

		res.statusCode = 404;
		res.statusMessage = 'Not Found';
		res.setHeader('Content-type', 'text/plain');
		res.send("The requested page could not be found.");
	}
	//page updated (replaced)
	else {
		console.log('update page success: ' + req.sessionID);

		delete session.pages[page];
		session.pages[title] = content;

		res.statusCode = 200;
		res.statusMessage = 'OK';
		res.setHeader('Content-type', 'text/plain');
		res.send("The requested page was updated.");
	}
}

//DELETE
exports.deletePage = function (req, res) {
	let page = req.params.page;

	//page not found
	if (!session.pages[page]) {
		console.log('delete page failure: ' + req.sessionID);

		res.statusCode = 404;
		res.statusMessage = 'Not Found';
		res.setHeader('Content-type', 'text/plain');
		res.send("The requested page could not be found.");
	}
	//page deleted
	else {
		console.log('delete page success: ' + req.sessionID);

		delete session.pages[page];

		res.statusCode = 200;
		res.statusMessage = 'OK';
		res.setHeader('Content-type', 'text/plain');
		res.send("The requested page was deleted.");
	}
}