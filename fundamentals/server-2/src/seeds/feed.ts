/**
 * Imports
 */
import { bold, red, gray, cyan } from 'colors';
const feeds: any = require('./../data/feeds.json');
const FeedsCollection: any = require('./../models/feed');

/**
 * Launch Seeder
 */
const FeedsSeeds: Function = async (): Promise<void> => {
	try {
		const data: any = feeds.data;
		await FeedsCollection.insertMany(data);
		console.log(bold(cyan('Feeds Dummy Data Seeded')));
	} catch (err) {
		console.log(bold(red('Feeds Seeding Error: ')), bold(gray((<Error>err).message)));
	}
};

/**
 * Exports
 */
module.exports = FeedsSeeds;
