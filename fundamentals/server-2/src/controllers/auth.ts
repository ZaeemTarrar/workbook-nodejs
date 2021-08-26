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
const { AppServer, Client }: any = Configurations;
const { events }: any = require('./../events/index');
const { AssertionError, JwtTokenError }: any = require('./../utils/errors/index');
const { notGiven }: any = require('./../messages/functions/index');
const Msg = require('./../messages/doc/index');
const { ForgetPasswordEmail }: any = require('./../messages/template/index');

/**
 * User Register
 */
module.exports.register = async (req: Request, res: Response): Promise<void> => {
	try {
		const { contact, email, password, SubRole }: any = req.body;
		assert(contact, notGiven('contact', 'User'));
		assert(email, notGiven('email', 'User'));
		assert(password, notGiven('password', 'User'));
		assert(SubRole, notGiven('SubRole', 'User'));
		const registeration: any = await UsersCollection.Register(req.body);
		ApiTools.set(CREATED, [ SUCCESS, Msg.Auth.Registered ], { registeration }).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
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
		assert(password, notGiven('password', 'User'));
		const result: any = await UsersCollection.Login(req.body);
		if (!result.token) ApiTools.set(CREATED, [ WARNING, 'Token cound not be created' ], result).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.Auth.LoggedIn ], result).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else if (JwtTokenError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * User Forget Password via Email
 */
module.exports.forgetPassword = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.body.email, notGiven('email', 'User'));
		const result: any = await UsersCollection.ForgetPassword(req.body.email);
		const resetUrl: string = `http://${Client.IpAddress}:${Client.Port}/resetpassword?token=${result.resetToken}`;
		const { message, subject }: any = ForgetPasswordEmail(resetUrl);
		events.emit('send-email', { email: req.body.email, message, subject });
		events.on('email-sent', (status: boolean) => {
			if (!status) ApiTools.set(BAD_REQUEST, [ WARNING, Msg.Auth.EmailNotSend ], result).show().send();
			else ApiTools.set(OK, [ SUCCESS, Msg.Auth.EmailSent ], { updation: result, resetUrl }).show().send();
		});
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], <Error>err).show().send();
	}
};

/**
 * User Reset Password
 */
module.exports.resetPassword = async (req: Request, res: Response): Promise<void> => {
	try {
		const { resetToken, password }: any = req.body;
		assert(resetToken, notGiven('resetToken', 'User'));
		assert(password, notGiven('password', 'User'));
		const result: any = await UsersCollection.ResetPassword(req.body);
		if (!result.updation) ApiTools.set(CREATED, [ WARNING, Msg.Auth.PasswordNotUpdated ], result).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.Auth.PasswordUpdated ], result).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else if (JwtTokenError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], <Error>err).show().send();
	}
};

/**
 * User Refresh Token
 */
module.exports.refreshToken = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.body.token, notGiven('token', 'User'));
		const result: any = await UsersCollection.RefreshToken(req.body.token);
		if (!result.newToken) ApiTools.set(OK, [ SUCCESS, Msg.Auth.TokenNotRefreshed ], null).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.Auth.TokenRefreshed ], null).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], <Error>err).show().send();
	}
};

/**
 * User Logout
 */
module.exports.logout = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.body.id, notGiven('id', 'User'));
		await UsersCollection.Logout(req.body.id);
		ApiTools.set(OK, [ SUCCESS, Msg.Auth.LoggedOut ], null).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], <Error>err).show().send();
	}
};
