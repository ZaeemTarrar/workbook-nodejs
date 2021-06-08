import { bold, gray, magenta, yellow, blue, green, cyan, red } from 'colors';
const { PORT, IP } = require('./../../configurations/index');

module.exports = (req: any, res: any, next: any): void => {
	let Method: string = req.method;
	let Body: any = req.body;
	let Params: any = req.params;
	let Url: string = req.url;
	let ClientIp: string = req.ip;
	let Protocol: string = req.protocol;
	let date = new Date();
	let CurrentDate: string = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
	let CurrentTime: string = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	console.log('\n');
	console.log(
		bold(magenta(`Main Gate: `)),
		bold(blue(Method)),
		bold(gray(`http://${IP}:${PORT}`) + green(`${Url}`)),
		bold(cyan(`${ClientIp}`))
	);
	console.log(bold(blue(`Data: `)), bold(cyan(JSON.stringify({ Params, Body }, null, 2))));
	next();
};
