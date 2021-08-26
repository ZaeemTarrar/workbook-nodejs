export {};

/**
 * Imports
 */
import { assert } from 'console';
import { v4 } from 'uuid';
const { model, Schema }: any = require('mongoose');
const { red, green, bold }: any = require('colors');
const FeedType = require('../static/FeedType/index');
const UsersCollection = require('../models/user');
const Msg = require('./../messages/doc/index');

/**
 * Name to be Saved & Used
 */
const CollectionName: string = 'Feeds';

/**
 * Model Schema
 */
const scheme: any = new Schema({
	_id: {
		type: String
	},
	heading: {
		type: String,
		index: true,
		required: [ true, 'Heading  is Required' ],
		validate: {
			validator(v: any) {
				return true;
			},
			message: (props: any): string => `${props.value} is not a valid Heading`
		}
	},
	message: {
		type: String,
		index: true,
		required: [ true, 'Message is Required' ],
		validate: {
			validator(v: any) {
				return true;
			},
			message: (props: any): string => `${props.value} is not a valid Message`
		}
	},
	description: {
		type: String,
		index: true,
		required: [ true, 'Description is Required' ],
		validate: {
			validator(v: any) {
				return true;
			},
			message: (props: any): string => `${props.value} is not a valid Description`
		}
	},
	thumbnail: {
		type: String,
		index: true,
		required: [ true, 'Thumbnail is Required' ],
		validate: {
			validator(v: any) {
				return true;
			},
			message: (props: any): string => `${props.value} is not a valid Thumbnail`
		}
	},
	status: {
		type: Boolean,
		default: false,
		nullable: false
	},
	feedType: {
		type: String,
		enum: Object.values(FeedType),
		default: 'PRIVATE_FEED',
		required: true
	},
	startDate: {
		type: String
	},
	endDate: {
		type: String
	},
	User: {
		type: String,
		ref: 'User',
		require: [ true, 'User is required' ]
	}
});

/**
 * Custom & Static Methods
 */
scheme.statics.collectAllPrivateFeeds = function(): any {
	return this.find({ feedType: 'PRIVATE_FEED' }).exec();
};
scheme.statics.collectAllPublicFeeds = function(): any {
	return this.find({ feedType: 'PUBLIC_FEED' }).exec();
};
scheme.statics.collectOnePublicFeed = function(id: string): any {
	return this.findOne({ _id: id, feedType: 'PUBLIC_FEED' }).exec();
};
scheme.statics.collectOnePrivateFeed = function(id: string): any {
	return this.findOne({ _id: id, feedType: 'PRIVATE_FEED' }).exec();
};
scheme.statics.collectUserBasedPrivateFeeds = function(id: string): any {
	return this.find({ User: id, feedType: 'PRIVATE_FEED' }).exec();
};
scheme.statics.collectUserBasedPublicFeeds = function(id: string): any {
	return this.find({ User: id, feedType: 'PUBLIC_FEED' }).exec();
};
scheme.statics.Create = async function(data: any): Promise<void> {
	const user = await UsersCollection.findOne({ _id: data.User }).exec();
	assert(user, Msg.User.UserNotFound);
	return await this.create({ ...data, _id: v4() });
};
scheme.statics.UpdateOne = async function(id: string, data: any): Promise<any> {
	let updation = await this.findByIdAndUpdate(id, data, {
		new: true,
		useFindAndModify: false
	});
	return updation;
};
scheme.statics.DeleteOne = function(id: string): any {
	return this.deleteOne({ _id: id }).exec();
};

/**
 * Actions Hooks
 */
scheme.pre('find', function(): void {
	console.log(bold(red(`[${CollectionName}-Find][Pre] `)));
});
scheme.post('find', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-Find][Post] `)));
});

scheme.pre('findOne', function(): void {
	console.log(bold(red(`[${CollectionName}-FindOne][Pre] `)));
});
scheme.post('findOne', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-FindOne][Post] `)));
});

scheme.pre('save', function(): void {
	console.log(bold(red(`[${CollectionName}-Save][Pre] `)));
});
scheme.post('save', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-Save][Post] `)));
});

scheme.pre('validate', function(): void {
	console.log(bold(red(`[${CollectionName}-Validate][Pre] `)));
});
scheme.post('validate', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-Validate][Post] `)));
});

scheme.pre('remove', function(): void {
	console.log(bold(red(`[${CollectionName}-Remove][Pre] `)));
});
scheme.post('remove', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-Remove][Post] `)));
});

scheme.pre('update', function(): void {
	console.log(bold(red(`[${CollectionName}-Update][Pre] `)));
});
scheme.post('update', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-Update][Post] `)));
});

scheme.pre('delete', function(): void {
	console.log(bold(red(`[${CollectionName}-Delete][Pre] `)));
});
scheme.post('delete', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-Delete][Post] `)));
});

scheme.pre('deleteOne', function(): void {
	console.log(bold(red(`[${CollectionName}-DeleteOne][Pre] `)));
});
scheme.post('deleteOne', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-DeleteOne][Post] `)));
});

scheme.pre('deleteMany', function(): void {
	console.log(bold(red(`[${CollectionName}-DeleteMany][Pre] `)));
});
scheme.post('deleteMany', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-DeleteMany][Post] `)));
});

scheme.pre('findByIdAndUpdate', function(): void {
	console.log(bold(red(`[${CollectionName}-FindByIdAndUpdate][Pre] `)));
});
scheme.post('findByIdAndUpdate', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-FindByIdAndUpdate][Post] `)));
});

scheme.pre('insertMany', function(): void {
	console.log(bold(red(`[${CollectionName}-InsertMany][Pre] `)));
});
scheme.post('insertMany', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-InsertMany][Post] `)));
});

const Collection: any = model(CollectionName, scheme);

module.exports = Collection;
