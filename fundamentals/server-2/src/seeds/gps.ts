/**
 * Imports
 */
import { bold, red, gray, cyan } from 'colors';
const gps: any = require('./../data/gps.json');
const GpsCollection: any = require('./../models/gps');

/**
 * Launch Seeder
 */
const GpsSeeds: Function = async (): Promise<void> => {
	try {
		const data: any = gps.data;
		await GpsCollection.insertMany(data);
		console.log(bold(cyan('Gps Dummy Data Seeded')));
	} catch (err) {
		console.log(bold(red('Gps Seeding Error: ')), bold(gray((<Error>err).message)));
	}
};

/**
 * Exports
 */
module.exports = GpsSeeds;
