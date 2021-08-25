/**
 * Imports
 */
import { bold, red, gray, cyan } from 'colors';
const roles: any = require('./../data/roles.json');
const RolesCollection: any = require('./../models/role');

/**
 * Launch Seeder
 */
const RolesSeeds: Function = async (): Promise<void> => {
	try {
		const data: any = roles.data;
		await RolesCollection.insertMany(data);
		console.log(bold(cyan('Roles Dummy Data Seeded')));
	} catch (err) {
		console.log(bold(red('Roles Seeding Error: ')), bold(gray((<Error>err).message)));
	}
};

/**
 * Exports
 */
module.exports = RolesSeeds;
