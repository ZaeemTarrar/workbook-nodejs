export {};

/**
 * Imports
 */
import { Request, Response } from 'express';
import { BAD_REQUEST, OK, CREATED } from 'http-status';
import assert from 'assert';
const { SUCCESS, ERROR, WARNING, INFO }: any = require('./../static/Message/index');
const ApiTools: any = require('./../libraries/ApiTools/index');
const UsersCollection: any = require('./../models/user');
const Configurations: any = require('./../configurations/index');
const { AppServer }: any = Configurations;
const { events }: any = require('./../events/index');

/**
 * User Register
 */
module.exports.register = async (req: Request, res: Response): Promise<void> => {
	try {
		const { contact, email, password, SubRole }: any = req.body;
		assert(contact, 'User `contact` is not provided');
		assert(email, 'User `email` is not provided');
		assert(password, 'User `password` is not provided');
		assert(SubRole, 'User `SubRole` is not provided');
		const registeration: any = await UsersCollection.Register(req.body);
		ApiTools.set(CREATED, [ SUCCESS, 'User Regsitered' ], { registeration }).show().send();
	} catch (err) {
		if (err.code === 'ERR_ASSERTION')
			ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], null).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * User Login
 */
module.exports.login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, password }: any = req.body;
		assert(username, 'User `username` i.e. ( email, contact ) is not provided');
		assert(password, 'User `password` is not provided');
		const result: any = await UsersCollection.Login(req.body);
		if (!result.token) ApiTools.set(CREATED, [ WARNING, 'Token cound not be created' ], result).show().send();
		else ApiTools.set(OK, [ SUCCESS, 'User Logged In' ], result).show().send();
	} catch (err) {
		if (err.code === 'ERR_ASSERTION')
			ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], null).show().send();
		else if (err.code === 'jwt_error')
			ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], null).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], <Error>err).show().send();
	}
};

/**
 * User Forget Password via Email
 */
module.exports.forgetPassword = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.body.email, 'User `email` i.e. ( email, contact ) is not provided');
		const result: any = await UsersCollection.ForgetPassword(req.body.email);

		// const resetUrl: string = `http://${C_IP}:${C_PORT}/resetpassword?token=${resetToken}`;
		const resetUrl: string = `http://${AppServer.IpAddress}:${AppServer.Port}/resetPassword/${result.resetToken}`;
		const message = `
			<h1> You have Requested a Password Reset </h1>
			<p> Please go to this Link to Reset Password </p>
			<a href=${resetUrl} clicktracking=off >${resetUrl}</a>
		`;
		const subject: string = 'Reset Password';
		events.emit('send-email', { email: req.body.email, message, subject });
		events.on('email-sent', (status: boolean) => {
			if (!status) ApiTools.set(BAD_REQUEST, [ WARNING, 'Email could not be sent' ], result).show().send();
			else
				ApiTools.set(OK, [ SUCCESS, 'Email to Reset Password has been Successfull sent' ], {
					updation: result,
					resetUrl
				})
					.show()
					.send();
		});
	} catch (err) {
		if (err.code === 'ERR_ASSERTION')
			ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], null).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], <Error>err).show().send();
	}
};
