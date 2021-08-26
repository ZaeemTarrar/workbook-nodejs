export {};

/**
 * Imports
 */
import { Request, Response } from 'express';
import { BAD_REQUEST, OK, CREATED } from 'http-status';
import assert from 'assert';
import { deleteModel } from 'mongoose';
const { SUCCESS, ERROR, WARNING, INFO }: any = require('./../static/Message/index');
const ApiTools: any = require('./../libraries/ApiTools/index');
const ComplainsCollection: any = require('./../models/complain');
const { AssertionError }: any = require('./../utils/errors/index');
const { notGiven, cantUpdate }: any = require('./../messages/functions/index');
const Msg = require('./../messages/doc/index');

/**
 * All Complains
 */
module.exports.fetchAll = async (req: Request, res: Response): Promise<void> => {
	try {
		const complains: any = await ComplainsCollection.collectAll();
		if (complains.length == 0)
			ApiTools.set(OK, [ INFO, Msg.Complain.NoComplainsFound ], { complains }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.Complain.ComplainsFound ], { complains }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * All Complains of User
 */
module.exports.fetchAllOfUser = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'User'));
		const complains: any = await ComplainsCollection.collectAllByUser(req.params.id);
		if (complains.length == 0)
			ApiTools.set(OK, [ INFO, Msg.Complain.NoUserComplainsFound ], { complains }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.Complain.UserComplainsFound ], { complains }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Single Complain
 */
module.exports.fetchOne = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'Complain'));
		const complain: any = await ComplainsCollection.collectAll();
		if (!complain) ApiTools.set(OK, [ INFO, Msg.Complain.NoComplainFound ], { complain }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.Complain.ComplainFound ], { complain }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Create Complain
 */
module.exports.create = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.body.User, notGiven('User', 'Complain'));
		const creation: any = await ComplainsCollection.Create(req.body);
		ApiTools.set(CREATED, [ SUCCESS, Msg.Complain.Created ], { creation }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Update Complain
 */
module.exports.update = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(!req.params.id, cantUpdate('User'));
		const updation: any = await ComplainsCollection.UpdateOne(req.body);
		ApiTools.set(CREATED, [ SUCCESS, Msg.Complain.Updated ], { updation }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Remove Complain
 */
module.exports.remove = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'Complain'));
		const deletion: any = await ComplainsCollection.DeleteOne(req.params.id);
		if (deletion.deletedCount == 0)
			ApiTools.set(CREATED, [ SUCCESS, Msg.Complain.NotDeleted ], { deletion }).show().send();
		else ApiTools.set(CREATED, [ SUCCESS, Msg.Complain.Deleted ], { deletion }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};
