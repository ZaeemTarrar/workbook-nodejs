/**
 * Imports
 */
import fs from 'fs';
import { bold, red, yellow, blue, cyan } from 'colors';
import dotenv, { DotenvConfigOutput } from 'dotenv';
import { address } from 'ip';
import path from 'path';
const result: DotenvConfigOutput = dotenv.config({ path: './development.env' });
const { parsed, error }: any = result;
const rfs: any = require('rotating-file-stream');

try {
	/**
   * Exception Handling
   */
	if (error) throw new Error(error);

	/**
   * Loading Configurations
   */
	const ApplicationMode: string = parsed.MODE || 'development';

	const ApplyAuthentication: boolean = Boolean(parsed.AUTHENTICATE);

	const Logs: any = {
		Show: Boolean(parsed.LOGS_SHOW),
		Save: Boolean(parsed.LOGS_SAVE)
	};

	const Client: any = {
		IpAddress: '192.168.100.114',
		Port: '3000'
	};

	const AppServer: object = {
		Secure: parsed.SECURE_SERVER,
		IpAddress: address() || parsed.HOST,
		Port: parsed.SECURE_SERVER != 'false' ? parsed.SECURE_PORT : parsed.PORT,
		Protocol: parsed.SECURE_SERVER != 'false' ? parsed.SECURE_PROTOCOL : parsed.PROTOCOL
	};

	const AppSession: object = {
		Secret: parsed.SESSION_SECRET
	};

	const Jwt: object = {
		Key: parsed.JWT_KEY,
		Expiry: parsed.JWT_EXPIRY,
		Algorithm: parsed.JWT_ALGORITH
	};

	const Encryption: any = {
		Salt: 8
	};

	const Http2: object = {
		Options: {
			key: fs.readFileSync('localhost-privkey.pem'),
			cert: fs.readFileSync('localhost-cert.pem'),
			requestCert: false,
			rejectUnauthorized: false
		}
	};

	const Email: any = {
		Host: parsed.EMAIL_HOST,
		Port: parsed.EMAI_PORT,
		Username: parsed.EMAIL_USERNAME,
		Password: parsed.EMAIL_PASSWORD
	};

	const Morgan: object = {
		AccessLogStream: {
			stream: rfs.createStream('access.log', {
				interval: '1d',
				path: path.join(__dirname, 'log')
			})
		}
	};

	let MongoDbCredentials: object | any = null;
	let MongoDbOptions: object | any = null;

	MongoDbCredentials = {
		host: parsed.MONGO_DB_HOST || 'localhost',
		port: parsed.MONGO_DB_PORT || '27017',
		database: parsed.MONGO_DB_DATABASE
	};

	if (ApplicationMode === 'production') {
		MongoDbOptions = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
			autoIndex: true,
			poolSize: 100,
			serverSelectionTimeoutMS: 10000,
			socketTimeoutMS: 10000,
			family: 4,
			user: parsed.MONGO_DB_USER,
			pass: parsed.MONGO_DB_PASS,
			authSource: parsed.MONGO_DB_AUTH_SOURCE
		};
	} else if (ApplicationMode === 'development') {
		MongoDbOptions = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
			autoIndex: true,
			poolSize: 100,
			serverSelectionTimeoutMS: 10000,
			socketTimeoutMS: 10000,
			family: 4
		};
	}

	/**
   * Exports
   */
	module.exports = {
		AppServer,
		Http2,
		AppSession,
		ApplicationMode,
		Morgan,
		MongoDbCredentials,
		MongoDbOptions,
		Jwt,
		Encryption,
		Email,
		ApplyAuthentication,
		Logs,
		Client
	};

	/**
   * Success Logs
   */
	console.log(bold(cyan('Configurations Initialized')));
} catch (err) {
	/**
   * Error Logs
   */
	console.log('Configurations Error: ', (<Error>err).message);
}
