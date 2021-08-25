export {};

/**
 * Imports
 */
import { v4 } from 'uuid';
const { model, Schema, Types }: any = require('mongoose');
const { red, green, bold }: any = require('colors');
const RolesCollection: any = require('./role');
const AuthorizationsCollection: any = require('./authorization');

/**
 * Name to be Saved & Used
 */
const CollectionName: string = 'SubRole';

/**
 * Model Schema
 */
const scheme: any = new Schema({
	_id: {
		type: String
	},
	title: {
		type: String,
		unique: true,
		required: [ true, 'Title is Required' ],
		get: (v: any) => v.toLowerCase(),
		set: (v: any) => v.toLowerCase(),
		validate: {
			validator(v: any) {
				return true;
			},
			message: (props: any): string => `${props.value} is not a valid Title`
		}
	},
	activeStatus: {
		type: Boolean,
		default: true,
		nullable: false
	},
	Authorization: {
		type: String,
		ref: 'Authorization'
	},
	Role: {
		type: String,
		ref: 'Role',
		required: true
	},
	Users: [
		{
			type: String,
			ref: 'User'
		}
	]
});

/**
 * Custom & Static Methods
 */
scheme.statics.collectAll = function(): any {
	return this.find({}).select('-Users -Role -Authorization').exec();
};
scheme.statics.collectOne = function(id: string): any {
	return this.findOne({ _id: id }).select('-Users -Role -Authorization').exec();
};
scheme.statics.CollectAll = function(): any {
	return this.find({})
		.populate('Authorization', '-SubRole')
		.populate('Role', '-SubRoles')
		.populate('Users', '-SubRoles')
		.exec();
};
scheme.statics.CollectOne = function(id: string): any {
	return this.findOne({ _id: id })
		.populate('Authorization', '-SubRole')
		.populate('Role', '-SubRoles')
		.populate('Users', '-SubRoles')
		.exec();
};
scheme.statics.Create = async function(body: any): Promise<any> {
	try {
		const { title, role, authorization }: any = body;
		const SubRoleCreation: any = await this.create({ _id: v4(), title, Role: role });
		const AuthorizationCreation: any = await AuthorizationsCollection.create({
			_id: v4(),
			SubRole: SubRoleCreation._id,
			...authorization
		});
		const Relation: any = await this.findByIdAndUpdate(
			SubRoleCreation._id,
			{ Authorization: AuthorizationCreation._id },
			{ new: true, useFindAndModify: false }
		);
		return { creation: { subrole: SubRoleCreation, authorization: AuthorizationCreation }, relation: Relation };
	} catch (err) {
		throw new Error(`SubRole Creation Error: ${(<Error>err).message}`);
	}
};
scheme.statics.DeleteOne = async function(id: string): Promise<any> {
	try {
		const SubRoleDeletion: any = await this.deleteOne({ _id: id });
		return { deletion: SubRoleDeletion };
	} catch (err) {
		throw new Error(`SubRole Deletion Error: ${(<Error>err).message}`);
	}
};
scheme.statics.UpdateOne = async function(id: string, body: any): Promise<any> {
	try {
		const SubRoleUpdation: any = await this.findByIdAndUpdate(id, body, { new: true, useFindAndModify: false });
		const AuthorizationFound: any = await AuthorizationsCollection.findOne({ SubRole: id });
		const AuthorizationUpdation: any = await AuthorizationsCollection.findByIdAndUpdate(
			AuthorizationFound._id,
			body.authorization,
			{
				new: true,
				useFindAndModify: false
			}
		);
		return { updation: { subrole: SubRoleUpdation, authorization: AuthorizationUpdation } };
	} catch (err) {
		throw new Error(`SubRole Updation Error: ${(<Error>err).message}`);
	}
};
scheme.statics.AddUser = function(parent: string, id: string): any {
	return this.findByIdAndUpdate(parent, { $push: { Users: id } }, { new: true, useFindAndModify: false });
};

/**
 * Action Logs
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
