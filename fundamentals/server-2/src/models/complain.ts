export {};

/**
 * Imports
 */
import { v4 } from 'uuid';
const { model, Schema }: any = require('mongoose');
const { red, green, bold }: any = require('colors');

/**
 * Name to be Saved & Used
 */
const CollectionName: string = 'Complain';

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
		required: [ true, 'title  is Required' ],
		validate: {
			validator(v: any) {
				return true;
			},
			message: (props: any): string => `${props.value} is not a valid title`
		}
	},
	type: {
		type: String,
		index: true,
		required: [ true, 'type is Required' ],
		validate: {
			validator(v: any) {
				return true;
			},
			message: (props: any): string => `${props.value} is not a valid type`
		}
	},
	description: {
		type: String
	},
	User: {
		type: String,
		ref: 'User',
		required: [ true, 'User is Required' ]
	},
	img: {
		type: String
	},
	date: {
		type: String
	}
});

/**
 * Custom & Static Methods
 */
scheme.statics.collectAll = function(): any {
	return this.find({}).exec();
};
scheme.statics.collectAllByUser = function(id: string): any {
	return this.find({ User: id }).exec();
};
scheme.statics.collectOne = function(id: any): any {
	return this.findOne({ _id: id }).exec();
};
scheme.statics.Create = function(data: any): any {
	return this.create({ ...data, _id: v4() });
};
scheme.statics.UpdateOne = async function(id: any, data: any): Promise<any> {
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
 * Actions Logs
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
