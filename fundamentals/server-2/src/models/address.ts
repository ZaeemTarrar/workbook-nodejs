export {};

/**
 * Imports
 */
import { red, green, bold } from 'colors';
const { model, Schema }: any = require('mongoose');

/**
 * Name to be Saved & Used
 */
const CollectionName: string = 'Address';

/**
 * Model Schema
 */
const scheme: any = new Schema({
	_id: {
		type: String
	},
	house: {
		type: String,
		index: true,
		validate: {
			validator(v: any) {
				return true;
			},
			message: (props: any): string => `${props.value} is not a valid House`
		}
	},
	street: {
		type: String,
		index: true,
		validate: {
			validator(v: any) {
				return true;
			},
			message: (props: any): string => `${props.value} is not a valid Street`
		}
	},
	block: {
		type: String,
		index: true,
		validate: {
			validator(v: any) {
				return true;
			},
			message: (props: any): string => `${props.value} is not a valid Block`
		}
	},
	phase: {
		type: String,
		index: true,
		validate: {
			validator(v: any) {
				return true;
			},
			message: (props: any): string => `${props.value} is not a valid phase`
		}
	},
	area: {
		type: String,
		index: true,
		validate: {
			validator(v: any) {
				return true;
			},
			message: (props: any): string => `${props.value} is not a valid Area`
		}
	},
	city: {
		type: String,
		index: true
	},
	country: {
		type: String,
		index: true
	},
	extraDetails: {
		type: String,
		index: true,
		validate: {
			validator(v: any) {
				return true;
			},
			message: (props: any): string => `${props.value} is not a valid ExtraDetails`
		}
	},
	Profile: {
		type: String,
		ref: 'Profile',
		required: true
	},
	Gps: {
		type: String,
		ref: 'Gps'
	}
});

/**
 * Custom & Static Methods
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
