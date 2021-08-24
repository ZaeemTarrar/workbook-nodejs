import fs from 'fs';
import dotenv, { DotenvConfigOutput } from 'dotenv';
const result: DotenvConfigOutput = dotenv.config();
const { parsed, error }: any = result;
const { ipAddress }: any = require('ip');

try {
	console.log('Configurations Successfully Initialized');

	const ApplicationMode: string = 'development';

	const MyServer: object = {
		Secure: Boolean(parsed.SECURE_SERVER),
		IpAddress: ipAddress || parsed.HOST,
		Port: Boolean(parsed.SECURE_SERVER) ? parsed.SECURE_PORT : parsed.PORT,
		Protocol: Boolean(parsed.SECURE_SERVER) ? parsed.SECURE_PROTOCOL : parsed.PROTOCOL
	};

	const Session: object = {
		Secret: '123456'
	};

	const Http2: object = {
		Options: {
			// key: fs.readFileSync('server.key'),
			// cert: fs.readFileSync('server.crt'),
			key: fs.readFileSync('localhost-privkey.pem'),
			cert: fs.readFileSync('localhost-cert.pem')
			// requestCert: false,
			// rejectUnauthorized: false
		}
	};

	module.exports = {
		MyServer,
		Http2,
		Session,
		ApplicationMode
	};
} catch (err) {
	console.log('Configurations Error: ', <Error>err.message);
}
