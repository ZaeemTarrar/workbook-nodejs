export {};

/**
 * Imports
 */
const { model, Schema }: any = require('mongoose');
const { blue, red, green, magenta, yellow, cyan, bold, gray }: any = require('colors');

/**
 * Name to be Saved and Used
 */
const CollectionName: string = 'Role';

/**
 * Model Schema
 */
const scheme: any = new Schema({
	_id: {
		type: String
	},
	title: {
		type: String,
		index: true,
		unique: true,
		required: [ true, 'Title is Required' ],
		get: (v: any) => v.toLowerCase(),
		set: (v: any) => v.toLowerCase(),
		validate: {
			validator(v: any) {
				return true;
			},
			message: (props: any) => `${props.value} is not a valid Title`
		}
	},
	activeStatus: {
		type: Boolean,
		default: true,
		nullable: false
	},
	SubRoles: [
		{
			type: String,
			ref: 'SubRole'
		}
	]
});

/**
 * Custom & Static Methods
 */
scheme.statics.collectAll = function(): any {
	return this.find({}).select('-SubRoles').exec();
};
scheme.statics.collectOne = function(id: string): any {
	return this.findOne({ _id: id }).select('-SubRoles').exec();
};
scheme.statics.CollectAll = function(): any {
	return this.find({})
		.populate({
			path: 'SubRoles',
			select: '-Role',
			model: 'SubRole',
			populate: [
				{ path: 'Authorization', model: 'Authorization' },
				{ path: 'Users', model: 'User', select: '-SubRoles' }
			]
		})
		.exec();
};
scheme.statics.CollectOne = function(id: string): any {
	return this.findOne({ _id: id })
		.populate({
			path: 'SubRoles',
			select: '-Role',
			model: 'SubRole',
			populate: [
				{ path: 'Authorization', model: 'Authorization' },
				{ path: 'Users', model: 'User', select: '-SubRoles' }
			]
		})
		.exec();
};

/**
 * Action Hooks
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
