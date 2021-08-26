/**
 * Imports
 */
import { bold, red, gray, cyan } from 'colors';
const addresses: any = require('./../data/addresses.json');
const AddressesCollection: any = require('./../models/address');

/**
 * Launch Seeder
 */
const AddressesSeeds: Function = async (): Promise<void> => {
	try {
		const data: any = addresses.data;
		await AddressesCollection.insertMany(data);
		console.log(bold(cyan('Addresses Dummy Data Seeded')));
	} catch (err) {
		console.log(bold(red('Addresses Seeding Error: ')), bold(gray((<Error>err).message)));
	}
};

/**
 * Exports
 */
module.exports = AddressesSeeds;
