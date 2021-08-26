import { AssertionError } from 'assert';
// const { SendNotification }: any = require('./../utils/firebase/index2');
const { MongoConnection }: any = require('./../database/mongoose');
const ProfilesCollection: any = require('./../models/profile');
const AddressCollection: any = require('./../models/address');

/**
 * Testing PlayGround
 */
const TestingGround: Function = async (): Promise<void> => {
	try {
		await MongoConnection();
		console.log(await ProfilesCollection.find({}).populate('Address').exec());
		// console.log(await SendNotification('Hello', 'Body', { name: 'Zaeem' }));
		process.exit();
	} catch (err) {
		console.log(err.message, err.code);
	}
};

/**
 * Fire Method
 */
TestingGround();
