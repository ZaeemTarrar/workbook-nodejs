export {};

/**
 * Imports
 */
import { bold, red, green } from 'colors';
const nodemailer: any = require('nodemailer');
const Configurations: any = require('./../../configurations/index');
const { Email }: any = Configurations;

/**
 * Email Sending Method
 */
const SendEmail: Function = async (options: any): Promise<any> => {
	const transporter: any = nodemailer.createTransport({
		// service: Email.Service,
		host: Email.Host,
		port: Email.Port,
		secure: false,
		auth: {
			user: Email.Username,
			pass: Email.Password
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	const MailOptions: any = {
		from: Email.Username,
		to: options.to,
		subject: options.subject,
		html: options.text
	};

	return await transporter.sendMail(MailOptions);
};

module.exports = SendEmail;
