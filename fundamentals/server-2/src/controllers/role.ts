export {};

/**
 * Imports
 */
import { Request, Response } from 'express';
import { BAD_REQUEST, OK } from 'http-status';
import assert from 'assert';
const { SUCCESS, ERROR, WARNING, INFO }: any = require('./../static/Message/index');
const ApiTools: any = require('./../libraries/ApiTools/index');
const RolesCollection: any = require('./../models/role');
const { AssertionError }: any = require('./../utils/errors/index');
const { notGiven }: any = require('./../messages/functions/index');
const Msg = require('./../messages/doc/index');

/**
 * All Roles
 */
module.exports.fetchAll = async (req: Request, res: Response): Promise<void> => {
	try {
		const roles: any = await RolesCollection.collectAll();
		if (roles.length == 0) ApiTools.set(OK, [ INFO, Msg.Role.NoRolesFound ], { roles }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.Role.RolesFound ], { roles }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Single Role
 */
module.exports.fetchOne = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'Role'));
		const role: any = await RolesCollection.collectOne(req.params.id);
		if (!role) ApiTools.set(OK, [ INFO, Msg.Role.NoRoleFound ], { role }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.Role.RoleFound ], { role }).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * All Roles with Relations and Extra Details
 */
module.exports.fetchAllExtra = async (req: Request, res: Response): Promise<void> => {
	try {
		const roles: any = await RolesCollection.CollectAll();
		if (roles.length == 0) ApiTools.set(OK, [ INFO, Msg.Role.NoRolesExtraFound ], { roles }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.Role.RolesExtraFound ], { roles }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * All Roles with Relations and Extra Details
 */
module.exports.fetchOneExtra = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'Role'));
		const role: any = await RolesCollection.CollectOne(req.params.id);
		if (!role) ApiTools.set(OK, [ INFO, Msg.Role.NoRoleExtraFound ], { role }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.Role.RoleExtraFound ], { role }).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};
