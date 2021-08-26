export {};

/**
 * Imports
 */
import { Request, Response } from 'express';
import { BAD_REQUEST, OK, CREATED } from 'http-status';
import assert from 'assert';
const { SUCCESS, ERROR, WARNING, INFO }: any = require('./../static/Message/index');
const ApiTools: any = require('./../libraries/ApiTools/index');
const FeedsCollection: any = require('./../models/feed');
const { AssertionError }: any = require('./../utils/errors/index');
const { notGiven, cantUpdate }: any = require('./../messages/functions/index');
const Msg = require('./../messages/doc/index');
const events: any = require('./../events/index');

/**
 * All Public Feeds
 */
module.exports.fetchAllPublic = async (req: Request, res: Response): Promise<void> => {
	try {
		const feeds: any = await FeedsCollection.collectAllPublicFeeds();
		if (feeds.length == 0) ApiTools.set(OK, [ INFO, Msg.Feed.NoPublicFeedsFound ], { feeds }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.Feed.PublicFeedsFound ], { feeds }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * All Private Feeds
 */
module.exports.fetchAllPrivate = async (req: Request, res: Response): Promise<void> => {
	try {
		const feeds: any = await FeedsCollection.collectAllPrivateFeeds();
		if (feeds.length == 0) ApiTools.set(OK, [ INFO, Msg.Feed.NoPrivateFeedsFound ], { feeds }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.Feed.PrivateFeedsFound ], { feeds }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * All Private Feeds of User
 */
module.exports.fetchAllUserPrivate = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'User'));
		const feeds: any = await FeedsCollection.collectUserBasedPrivateFeeds(req.params.id);
		if (feeds.length == 0) ApiTools.set(OK, [ INFO, Msg.Feed.NoUserPrivateFeedsFound ], { feeds }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.Feed.UserPrivateFeedsFound ], { feeds }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * All Private Feeds of User
 */
module.exports.fetchAllUserPublic = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'User'));
		const feeds: any = await FeedsCollection.collectUserBasedPublicFeeds(req.params.id);
		if (feeds.length == 0) ApiTools.set(OK, [ INFO, Msg.Feed.NoUserPublicFeedsFound ], { feeds }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.Feed.UserPublicFeedsFound ], { feeds }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Single Private Feed
 */
module.exports.fetchOnePrivate = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'Feed'));
		const feed: any = await FeedsCollection.collectOnePrivateFeed(req.params.id);
		if (!feed) ApiTools.set(OK, [ INFO, Msg.Feed.NoPrivateFeedFound ], { feed }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.Feed.PrivateFeedFound ], { feed }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Single Public Feed
 */
module.exports.fetchOnePublic = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'Feed'));
		const feed: any = await FeedsCollection.collectOnePublicFeed(req.params.id);
		if (!feed) ApiTools.set(OK, [ INFO, Msg.Feed.NoPublicFeedFound ], { feed }).show().send();
		else ApiTools.set(OK, [ SUCCESS, Msg.Feed.PublicFeedFound ], { feed }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Create Feed
 */
module.exports.create = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.body.User, notGiven('User', 'Feed'));
		const creation: any = await FeedsCollection.Create(req.body);
		if (creation.feedType == 'PUBLIC_FEED') {
			events.emit('send-public-notification', {});
			events.on('public-notification-sent', (status: boolean) => {
				if (!status) throw new Error(Msg.Firebase.PublicNotSent);
				else ApiTools.set(CREATED, [ SUCCESS, Msg.Firebase.PublicSent ], { creation }).show().send();
			});
		} else {
			events.emit('send-rivate-notification', {});
			events.on('private-notification-sent', (status: boolean) => {
				if (!status) throw new Error(Msg.Firebase.PrivateNotSent);
				else ApiTools.set(CREATED, [ SUCCESS, Msg.Firebase.PrivateSent ], { creation }).show().send();
			});
		}
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Update Feed
 */
module.exports.update = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(!req.params.id, cantUpdate('User'));
		const updation: any = await FeedsCollection.UpdateOne(req.body);
		ApiTools.set(CREATED, [ SUCCESS, Msg.Feed.Updated ], { updation }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};

/**
 * Remove Feed
 */
module.exports.remove = async (req: Request, res: Response): Promise<void> => {
	try {
		assert(req.params.id, notGiven('id', 'Feed'));
		const deletion: any = await FeedsCollection.DeleteOne(req.params.id);
		if (deletion.deletedCount == 0)
			ApiTools.set(CREATED, [ SUCCESS, Msg.Feed.NotDeleted ], { deletion }).show().send();
		else ApiTools.set(CREATED, [ SUCCESS, Msg.Feed.Deleted ], { deletion }).show().send();
	} catch (err) {
		ApiTools.set(BAD_REQUEST, [ ERROR, (<Error>err).message ], err).show().send();
	}
};
