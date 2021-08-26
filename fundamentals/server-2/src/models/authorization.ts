export {};

/**
 * Imports
 */
import { BAD_REQUEST, NOT_MODIFIED } from 'http-status';
import { v4 } from 'uuid';
const { model, Schema }: any = require('mongoose');
const { blue, red, green, magenta, yellow, cyan, bold, gray }: any = require('colors');
const { DbHookConsoleLogs }: any = require('./../configurations/index');

/**
 * Name to be Saved & Used
 */
const CollectionName: string = 'Authorization';

/**
 * Model Schema
 */
const scheme: any = new Schema({
	_id: {
		type: String
	},
	SubRole: {
		type: String,
		ref: 'SubRole',
		required: [ true, 'SubRole is not Provided' ]
	},
	canViewRoles: {
		type: Boolean,
		default: false
	},
	canViewSingleRole: {
		type: Boolean,
		default: false
	},
	canViewRolesExtra: {
		type: Boolean,
		default: false
	},
	canViewSingleRoleExtra: {
		type: Boolean,
		default: false
	},
	canAddRoles: {
		type: Boolean,
		default: false
	},
	canDeleteRoles: {
		type: Boolean,
		default: false
	},
	canUpdateRoles: {
		type: Boolean,
		default: false
	},
	canViewSubRoles: {
		type: Boolean,
		default: false
	},
	canViewSingleSubRole: {
		type: Boolean,
		default: false
	},
	canViewSubRolesExtra: {
		type: Boolean,
		default: false
	},
	canViewSingleSubRoleExtra: {
		type: Boolean,
		default: false
	},
	canAddSubRoles: {
		type: Boolean,
		default: false
	},
	canDeleteSubRoles: {
		type: Boolean,
		default: false
	},
	canUpdateSubRoles: {
		type: Boolean,
		default: false
	},
	canViewLogs: {
		type: Boolean,
		default: false
	},
	canViewMaps: {
		type: Boolean,
		default: false
	},
	canChatViaMessage: {
		type: Boolean,
		default: false
	},
	canChatViaCall: {
		type: Boolean,
		default: false
	},
	CanAddUsers: {
		type: Boolean,
		default: false
	},
	canDeleteUsers: {
		type: Boolean,
		default: true
	},
	canUpdateUsers: {
		type: Boolean,
		default: false
	},
	canViewUsers: {
		type: Boolean,
		default: false
	},
	canViewSingleUser: {
		type: Boolean,
		default: false
	},
	canViewUsersExtra: {
		type: Boolean,
		default: false
	},
	canViewSingleUserExtra: {
		type: Boolean,
		default: false
	},
	canViewLabourStats: {
		type: Boolean,
		default: false
	},
	canViewComplainStats: {
		type: Boolean,
		default: false
	},
	canAddPropertyDetails: {
		type: Boolean,
		default: false
	},
	canEditProfile: {
		type: Boolean,
		default: false
	},
	canAssignRoles: {
		type: Boolean,
		default: false
	},
	canSendPrivateNotifications: {
		type: Boolean,
		default: false
	},
	canSendPublicNotifications: {
		type: Boolean,
		default: false
	},
	canViewPrivateFeeds: {
		type: Boolean,
		default: false
	},
	canViewPublicFeeds: {
		type: Boolean,
		default: false
	},
	canViewSinglePublicFeed: {
		type: Boolean,
		default: false
	},
	canViewSingleUserFeeds: {
		type: Boolean,
		default: false
	},
	canAddPrivateFeeds: {
		type: Boolean,
		default: false
	},
	canAddPublicFeeds: {
		type: Boolean,
		default: false
	},
	canUpdatePublicFeeds: {
		type: Boolean,
		default: false
	},
	canUpdatePrivateFeeds: {
		type: Boolean,
		default: false
	},
	canDeleteFeeds: {
		type: Boolean,
		default: false
	}
});

/**
 * Custom & Static Mehtods
 */

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
