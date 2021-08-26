export {};

/**
 * Imports
 */
import { Request, Response } from 'express';
import { BAD_REQUEST, OK, CREATED } from 'http-status';
import assert from 'assert';
const { SUCCESS, ERROR, WARNING, INFO }: any = require('./../static/Message/index');
const ApiTools: any = require('./../libraries/ApiTools/index');
const SubRolesCollection: any = require('./../models/subrole');
const { AssertionError }: any = require('./../utils/errors/index');
const { notGiven }: any = require('./../messages/functions/index');
const Msg = require('./../messages/doc/index');

/**
 * All SubRoles
 */
module.exports.fetchAll = async (req: Request, res: Response): Promise<void> => {
	try {
		const subroles: any = await SubRolesCollection.collectAll();
		if (subroles.length == 0) ApiTools.set(OK, [ INFO, Msg.SubRole.NoSubRolesFound ], { subroles }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.SubRole.SubRolesFound ], { subroles }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Single SubRole
 */
module.exports.fetchOne = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'SubRole'));
		const subrole: any = await SubRolesCollection.collectOne(req.params.id);
		if (!subrole) ApiTools.set(BAD_REQUEST, [ INFO, Msg.SubRole.NoSubRoleFound ], { subrole }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.SubRole.SubRoleFound ], { subrole }).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * All SubRoles with Relations and Extra Details
 */
module.exports.fetchAllExtra = async (req: Request, res: Response): Promise<void> => {
	try {
		const subroles: any = await SubRolesCollection.CollectAll();
		if (subroles.length == 0)
			ApiTools.set(OK, [ INFO, Msg.SubRole.NoSubRolesExtraFound ], { subroles }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.SubRole.SubRolesExtraFound ], { subroles }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Single SubRole with Relations and Extra Details
 */
module.exports.fetchOneExtra = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'SubRole'));
		const subrole: any = await SubRolesCollection.CollectOne(req.params.id);
		if (!subrole) ApiTools.set(BAD_REQUEST, [ INFO, Msg.SubRole.NoSubRoleExtraFound ], { subrole }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.SubRole.SubRoleExtraFound ], { subrole }).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Create New SubRole
 */
module.exports.create = async (req: Request, res: Response): Promise<void> => {
	try {
		const { title, role, authorization }: any = req.body;
		assert(title, notGiven('title', 'SubRole'));
		assert(role, notGiven('role', 'SubRole'));
		assert(authorization, notGiven('authorization', 'SubRole'));
		const result: any = await SubRolesCollection.Create(req.body);
		ApiTools.set(CREATED, [ SUCCESS, Msg.SubRole.Created ], result).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Update SubRole
 */
module.exports.update = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'SubRole'));
		const result: any = await SubRolesCollection.UpdateOne(req.params.id, req.body);
		ApiTools.set(OK, [ SUCCESS, Msg.SubRole.Updated ], result).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Delete SubRole
 */
module.exports.remove = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'SubRole'));
		const result: any = await SubRolesCollection.DeleteOne(req.params.id);
		if (result.deletion.deletedCount == 0)
			ApiTools.set(OK, [ SUCCESS, Msg.SubRole.NotDeleted ], result).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.SubRole.Deleted ], result).show().send();
	} catch (err) {
		if (AssertionError(err)) ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], err).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};
