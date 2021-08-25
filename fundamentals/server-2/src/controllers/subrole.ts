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

/**
 * All SubRoles
 */
module.exports.fetchAll = async (req: Request, res: Response): Promise<void> => {
	try {
		const subroles: any = await SubRolesCollection.collectAll();
		if (subroles.length == 0) ApiTools.set(OK, [ INFO, 'Empty List of SubRoles' ], { subroles }).show().send();
		else ApiTools.set(OK, [ SUCCESS, 'List of All SubRoles' ], { subroles }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], null).show().send();
	}
};

/**
 * Single SubRole
 */
module.exports.fetchOne = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, 'SubRole `id` is not provided');
		const subrole: any = await SubRolesCollection.collectOne(req.params.id);
		if (!subrole) ApiTools.set(OK, [ INFO, 'No SubRole Found' ], { subrole }).show().send();
		else ApiTools.set(OK, [ SUCCESS, 'SubRole Found' ], { subrole }).show().send();
	} catch (err) {
		if (err.code === 'ERR_ASSERTION')
			ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], null).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * All SubRoles with Relations and Extra Details
 */
module.exports.fetchAllExtra = async (req: Request, res: Response): Promise<void> => {
	try {
		const subroles: any = await SubRolesCollection.CollectAll();
		if (subroles.length == 0) ApiTools.set(OK, [ INFO, 'Empty List of SubRoles' ], { subroles }).show().send();
		else ApiTools.set(OK, [ SUCCESS, 'List of All SubRoles' ], { subroles }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], null).show().send();
	}
};

/**
 * Single SubRole with Relations and Extra Details
 */
module.exports.fetchOneExtra = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, 'SubRole `id` is not provided');
		const subrole: any = await SubRolesCollection.CollectOne(req.params.id);
		if (!subrole) ApiTools.set(OK, [ INFO, 'No SubRole Found' ], { subrole }).show().send();
		else ApiTools.set(OK, [ SUCCESS, 'SubRole Found' ], { subrole }).show().send();
	} catch (err) {
		if (err.code === 'ERR_ASSERTION')
			ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], null).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Create New SubRole
 */
module.exports.create = async (req: Request, res: Response): Promise<void> => {
	try {
		const { title, role, authorization }: any = req.body;
		assert(title, 'SubRole `title` is not provided');
		assert(role, 'Role `role` is not provided');
		assert(authorization, 'Role `authorization` is not provided');
		const result: any = await SubRolesCollection.Create(req.body);
		ApiTools.set(CREATED, [ SUCCESS, 'New SubRole Created' ], result).show().send();
	} catch (err) {
		if (err.code === 'ERR_ASSERTION')
			ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], null).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Update SubRole
 */
module.exports.update = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, 'SubRole `id` is not provided');
		const result: any = await SubRolesCollection.UpdateOne(req.params.id, req.body);
		ApiTools.set(OK, [ SUCCESS, 'SubRole Updated' ], result).show().send();
	} catch (err) {
		if (err.code === 'ERR_ASSERTION')
			ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], null).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Delete SubRole
 */
module.exports.remove = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, 'SubRole `id` is not provided');
		const result: any = await SubRolesCollection.DeleteOne(req.params.id);
		if (result.deletion.deletedCount == 0)
			ApiTools.set(OK, [ SUCCESS, 'No SubRole Deleted' ], result).show().send();
		else ApiTools.set(OK, [ SUCCESS, 'SubRole Deleted' ], result).show().send();
	} catch (err) {
		if (err.code === 'ERR_ASSERTION')
			ApiTools.set(BAD_REQUEST, [ WARNING, (<Error>err).message ], null).show().send();
		else ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};
