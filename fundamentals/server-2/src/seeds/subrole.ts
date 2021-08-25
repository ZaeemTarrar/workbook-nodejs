/**
 * Imports
 */
import { bold, red, gray, cyan } from 'colors';
const subroles: any = require('./../data/subroles.json');
const SubRolesCollection: any = require('./../models/subrole');

/**
 * Launch Seeder
 */
const SubRolesSeeds: Function = async (): Promise<void> => {
	try {
		const data: any = subroles.data;
		await SubRolesCollection.insertMany(data);
		console.log(bold(cyan('SubRoles Dummy Data Seeded')));
	} catch (err) {
		console.log(bold(red('SubRoles Seeding Error: ')), bold(gray((<Error>err).message)));
	}
};

/**
 * Exports
 */
module.exports = SubRolesSeeds;
