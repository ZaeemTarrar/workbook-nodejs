// child.js
try {
	process.on('message', function(message) {
		console.log(`Message from main.js: ${message}`);
		(<any>process).send('Nathan');
	});
} catch (err) {
	console.log(<Error>err.message);
}
