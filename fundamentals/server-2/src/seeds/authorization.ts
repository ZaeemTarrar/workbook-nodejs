/**
 * Imports
 */
import { bold, red, gray, cyan } from 'colors';
const authorizations: any = require('./../data/authorizations.json');
const AuthorizationsCollection: any = require('./../models/authorization');

/**
 * Launch Seeder
 */
const AuthorizationsSeeds: Function = async (): Promise<void> => {
	try {
		const data: any = authorizations.data;
		await AuthorizationsCollection.insertMany(data);
		console.log(bold(cyan('Authorizations Dummy Data Seeded')));
	} catch (err) {
		console.log(bold(red('Authorizations Seeding Error: ')), bold(gray((<Error>err).message)));
	}
};

/**
 * Exports
 */
module.exports = AuthorizationsSeeds;
