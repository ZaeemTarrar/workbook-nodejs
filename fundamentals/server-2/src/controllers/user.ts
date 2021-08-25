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

/**
 * All Roles
 */
module.exports.fetchAll = async (req: Request, res: Response): Promise<void> => {
	try {
		const users: any = await UsersCollection.collectAll();
		if (users.length == 0) ApiTools.set(OK, [ INFO, 'Empty List of Users' ], { users }).show().send();
		else ApiTools.set(OK, [ SUCCESS, 'List of All Users' ], { users }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], null).show().send();
	}
};

/**
 * Single Role
 */
module.exports.fetchOne = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, 'User `id` is not provided');
		const user: any = await UsersCollection.collectOne(req.params.id);
		if (!user) ApiTools.set(OK, [ INFO, 'No User Found' ], { user }).show().send();
		else ApiTools.set(OK, [ SUCCESS, 'User Found' ], { user }).show().send();
	} catch (err) {
		if (err.code === 'ERR_ASSERTION')
			ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], null).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * All Roles with Relations and Extra Details
 */
module.exports.fetchAllExtra = async (req: Request, res: Response): Promise<void> => {
	try {
		const users: any = await UsersCollection.CollectAll();
		if (users.length == 0) ApiTools.set(OK, [ INFO, 'Empty List of Users' ], { users }).show().send();
		else ApiTools.set(OK, [ SUCCESS, 'List of All Users' ], { users }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], null).show().send();
	}
};

/**
 * Single Role with Relations and Extra Details
 */
module.exports.fetchOneExtra = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, 'User `id` is not provided');
		const user: any = await UsersCollection.CollectOne(req.params.id);
		if (!user) ApiTools.set(OK, [ INFO, 'No User Found' ], { user }).show().send();
		else ApiTools.set(OK, [ SUCCESS, 'User Found' ], { user }).show().send();
	} catch (err) {
		if (err.code === 'ERR_ASSERTION')
			ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], null).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};
