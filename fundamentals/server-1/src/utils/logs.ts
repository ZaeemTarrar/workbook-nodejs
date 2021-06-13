const fs = require('fs');
const { bold, red, green, blue, yellow, gray, magenta } = require('colors');
const resolve = require('path').resolve;

const FilePath = resolve('./src/logs/index.log');

const CreateLog: Function = (
	method: string,
	date: string,
	time: string,
	protocol: string,
	client: string,
	url: string,
	body: object,
	params: object
): void => {
	try {
		let Content = fs.readFileSync(FilePath, 'utf8');
		Content += `
    <=====================================>

    Method: ${method}
    Date: ${date}
    Time: ${time}
    Protocol: ${protocol}
    Client Ip: ${client}
    Complete Url: ${url}
    Body: ${JSON.stringify(body)}
    Params: ${JSON.stringify(params)}

    <=====================================>
    `;
		return fs.writeFile(FilePath, Content, (err: Error) => {
			if (err) {
				return console.log(bold(red(`Write File - Log File Error: `)), bold(gray(err.message)));
			}
			console.log(bold(green(`Request Logs Saved`)));
		});
	} catch (err) {
		console.log(bold(red(`Try Catch - Log File Error: `)), bold(gray(err.message)));
	}
};

const ClearLogs: Function = (): void => {
	try {
		return fs.writeFile(FilePath, '', (err: Error) => {
			if (err) {
				return console.log(bold(red(`Write File - Clearing Log File Error: `)), bold(gray(err.message)));
			}
			console.log(bold(magenta(`All Pervious Logs are Cleared`)));
		});
	} catch (err) {
		console.log(bold(red(`Try Catch - Clearing Logs Error: `)), bold(gray(err.message)));
	}
};

module.exports = {
	CreateLog,
	ClearLogs
};
