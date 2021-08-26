/**
 * Imports
 */
import { bold, red, gray, cyan } from 'colors';
const complains: any = require('./../data/complains.json');
const ComplainsCollection: any = require('./../models/complain');

/**
 * Launch Seeder
 */
const ComplainsSeeds: Function = async (): Promise<void> => {
	try {
		const data: any = complains.data;
		await ComplainsCollection.insertMany(data);
		console.log(bold(cyan('Complains Dummy Data Seeded')));
	} catch (err) {
		console.log(bold(red('Complains Seeding Error: ')), bold(gray((<Error>err).message)));
	}
};

/**
 * Exports
 */
module.exports = ComplainsSeeds;
