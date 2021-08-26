/**
 * Imports
 */
import { bold, red, gray, cyan } from 'colors';
const profiles: any = require('./../data/profiles.json');
const ProfilesCollection: any = require('./../models/profile');

/**
 * Launch Seeder
 */
const ProfilesSeeds: Function = async (): Promise<void> => {
	try {
		const data: any = profiles.data;
		await ProfilesCollection.insertMany(data);
		console.log(bold(cyan('Profile Dummy Data Seeded')));
	} catch (err) {
		console.log(bold(red('Profile Seeding Error: ')), bold(gray((<Error>err).message)));
	}
};

/**
 * Exports
 */
module.exports = ProfilesSeeds;
