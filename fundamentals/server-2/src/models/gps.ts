export {};

/**
 * Imports
 */
const { model, Schema }: any = require('mongoose');
const { red, green, bold }: any = require('colors');

/**
 * Name to be Saved & Used
 */
const CollectionName: string = 'Gps';

const scheme: any = new Schema({
	_id: {
		type: String
	},
	latitude: {
		type: String,
		index: true
	},
	longitude: {
		type: String,
		index: true
	},
	Address: {
		type: String,
		ref: 'Address',
		required: true
	}
});

/**
 * Custom & Statis Methods
 */

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
