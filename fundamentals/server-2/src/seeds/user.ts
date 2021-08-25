/**
 * Imports
 */
import { bold, red, gray, cyan } from 'colors';
const users: any = require('./../data/users.json');
const UsersCollection: any = require('./../models/user');
const { GenerateHash }: any = require('./../utils/encryptors/index');

/**
 * Launch Seeder
 */
const UsersSeeds: Function = async (): Promise<void> => {
	try {
		const data: any = users.data;
		let newData: any[] = [];
		for (let i = 0; i < data.length; i++) {
			newData.push({ ...data[i], password: await GenerateHash(data[i].password) });
		}
		await UsersCollection.insertMany(newData);
		console.log(bold(cyan('Users Dummy Data Seeded')));
	} catch (err) {
		console.log(bold(red('Users Seeding Error: ')), bold(gray((<Error>err).message)));
	}
};

/**
 * Exports
 */
module.exports = UsersSeeds;
