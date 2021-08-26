export {};

/**
 * Imports
 */
import { Request, Response } from 'express';
import { BAD_REQUEST, OK } from 'http-status';
import assert from 'assert';
const { SUCCESS, ERROR, WARNING, INFO }: any = require('./../static/Message/index');
const ApiTools: any = require('./../libraries/ApiTools/index');
const UsersCollection: any = require('./../models/user');
const { AssertionError }: any = require('./../utils/errors/index');
const { notGiven, cantUpdate }: any = require('./../messages/functions/index');
const Msg = require('./../messages/doc/index');

/**
 * All User
 */
module.exports.fetchAll = async (req: Request, res: Response): Promise<void> => {
	try {
		const users: any = await UsersCollection.collectAll();
		if (users.length == 0) ApiTools.set(OK, [ INFO, Msg.User.NoUsersFound ], { users }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.User.UsersFound ], { users }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Single User
 */
module.exports.fetchOne = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'User'));
		const user: any = await UsersCollection.collectOne(req.params.id);
		if (!user) ApiTools.set(OK, [ INFO, Msg.User.NoUserFound ], { user }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.User.UserFound ], { user }).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * All User with Relations and Extra Details
 */
module.exports.fetchAllExtra = async (req: Request, res: Response): Promise<void> => {
	try {
		const users: any = await UsersCollection.CollectAll();
		if (users.length == 0) ApiTools.set(OK, [ INFO, Msg.User.NoUsersExtraFound ], { users }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.User.UserExtraFound ], { users }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Single User with Relations and Extra Details
 */
module.exports.fetchOneExtra = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'User'));
		const user: any = await UsersCollection.CollectOne(req.params.id);
		if (!user) ApiTools.set(OK, [ INFO, Msg.User.NoUserExtraFound ], { user }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.User.UserExtraFound ], { user }).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Update User
 */
module.exports.update = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'User'));
		assert(!req.body.password, cantUpdate('password'));
		assert(!req.body.email, cantUpdate('email'));
		assert(!req.body.contact, cantUpdate('contact'));
		assert(!req.body.token, cantUpdate('token'));
		assert(!req.body.refreshToken, cantUpdate('refreshToken'));
		assert(!req.body.refreshTokenExpiry, cantUpdate('refreshTokenExpiry'));
		assert(!req.body.verified, cantUpdate('verified'));
		assert(!req.body.Profile._id, cantUpdate('Profile._id'));
		assert(!req.body.Profile.Address, cantUpdate('Profile.Address'));
		assert(!req.body.Profile.User, cantUpdate('Profile.User'));
		assert(!req.body.Address._id, cantUpdate('Address._id'));
		assert(!req.body.Address.Profile, cantUpdate('Address.Profile'));
		assert(!req.body.Address.Gps, cantUpdate('Address.Gps'));
		assert(!req.body.Gps._id, cantUpdate('Gps._id'));
		assert(!req.body.Gps.Address, cantUpdate('Gps.Address'));
		const updation: any = await UsersCollection.UpdateOne(req.params.id, req.body);
		ApiTools.set(OK, [ SUCCESS, Msg.User.Updated ], { updation }).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Update User
 */
module.exports.updatePassword = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'User'));
		assert(req.body.password, notGiven('password', 'User'));
		const updation: any = await UsersCollection.UpdatePassword(req.params.id, req.body.password);
		ApiTools.set(OK, [ SUCCESS, Msg.User.Updated ], { updation }).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Remove User
 */
module.exports.remove = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'User'));
		const deletion: any = await UsersCollection.DeleteOne(req.params.id);
		ApiTools.set(OK, [ SUCCESS, Msg.User.Deleted ], { deletion }).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};
