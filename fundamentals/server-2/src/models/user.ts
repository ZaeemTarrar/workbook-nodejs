export {};

/**
 * Imports
 */
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import assert, { AssertionError } from 'assert';
const Configurations: any = require('./../configurations/index');
const { Jwt }: any = Configurations;
const { model, Schema }: any = require('mongoose');
const { red, green, yellow, bold }: any = require('colors');
const { GenerateHash, ValidPassword }: any = require('./../utils/encryptors/index');
const SubRolesCollection: any = require('./../models/subrole');
const { setSession, getSession }: any = require('./../storage/redisServer');
const Msg = require('./../messages/doc/index');
const { JwtTokenError }: any = require('./../utils/errors/index');
const ProfilesCollection: any = require('./profile');
const AddressesCollection: any = require('./address');
const GpsCollection: any = require('./gps');

/**
 * Name to be Saved and Used
 */
const CollectionName: string = 'User';

/**
 * Model Schema
 */
const scheme: any = new Schema({
	_id: {
		type: String
	},
	contact: {
		type: String,
		index: true,
		unique: true,
		required: [ true, 'Contact is Required' ],
		validate: {
			validator(v: any) {
				if (v.length == 11) return true;
				else return false;
			},
			message: (props: any): string => `${props.value} is not a valid contact number`
		}
	},
	email: {
		type: String,
		index: true,
		unique: true,
		required: [ true, 'Email is Required' ],
		validate: {
			validator(v: any) {
				const letters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
				if (v.match(letters)) {
					return true;
				} else {
					return false;
				}
			},
			message: (props: any): string => `${props.value} is not a valid email`
		}
	},
	password: {
		type: String,
		required: [ true, 'Password is Required' ],
		validate: {
			validator(v: any) {
				return true;
			},
			message: (props: any): string => `${props.value} is not a valid Title`
		}
	},
	token: {
		type: String
	},
	resetToken: {
		type: String
	},
	resetTokenExpiry: {
		type: Number
	},
	verified: {
		type: Boolean,
		default: true
	},
	SubRole: {
		type: String,
		ref: 'SubRole',
		required: true
	},
	Profile: {
		type: String,
		ref: 'Profile'
	}
});

/**
 * Custom Direct Methods
 */
scheme.methods.Tokenize = function(): any {
	return jwt.sign(
		{
			_id: this._id,
			contact: this.contact,
			email: this.email,
			password: this.password
		},
		Jwt.Key,
		{
			expiresIn: 60 * Jwt.Expiry
		}
	);
};
scheme.methods.GetResetPasswordToken = async function() {
	const expiry: any = 3;
	const resetToken: any = await jwt.sign({ id: v4() }, Jwt.Key, {
		expiresIn: 60 * expiry
	});
	const resetTokenExpiry: any = Date.now() + expiry * 60000;
	return { resetToken, resetTokenExpiry };
};

/**
 * Custom & Static Methods
 */

/**
 * User Methods
 */
scheme.statics.collectAll = function(): any {
	return this.find({}).select('-SubRole').exec();
};
scheme.statics.collectOne = function(id: string): any {
	return this.findOne({ _id: id }).select('-SubRole').exec();
};
scheme.statics.CollectAll = function(): any {
	return this.find({})
		.populate({
			path: 'SubRole',
			model: 'SubRole',
			select: '-Users',
			populate: [
				{ path: 'Role', model: 'Role', select: '-SubRoles' },
				{ path: 'Authorization', model: 'Authorization' }
			]
		})
		.populate({
			path: 'Profile',
			model: 'Profile',
			populate: [
				{
					path: 'Address',
					model: 'Address',
					populate: [ { path: 'Gps', model: 'Gps' } ]
				}
			]
		})
		.exec();
};
scheme.statics.CollectOne = function(id: string): any {
	return this.findOne({ _id: id })
		.populate({
			path: 'SubRole',
			model: 'SubRole',
			select: '-Users',
			populate: [
				{ path: 'Role', model: 'Role', select: '-SubRoles' },
				{ path: 'Authorization', model: 'Authorization' }
			]
		})
		.populate({
			path: 'Profile',
			model: 'Profile',
			populate: [
				{
					path: 'Address',
					model: 'Address',
					populate: [ { path: 'Gps', model: 'Gps' } ]
				}
			]
		})
		.exec();
};
scheme.statics.UpdateOne = async function(id: string, data: any): Promise<any> {
	const user: any = await this.CollectOne(id);
	assert(user, Msg.Auth.UserNotFound);
	const profile: any = await ProfilesCollection.findByIdAndUpdate(
		user.Profile._id,
		{ ...data.Profile },
		{ new: true, useFindAndModify: false }
	);
	const address: any = await AddressesCollection.findByIdAndUpdate(
		user.Profile.Address._id,
		{ ...data.Address },
		{ new: true, useFindAndModify: false }
	);
	const gps: any = await GpsCollection.findByIdAndUpdate(
		user.Profile.Address.Gps._id,
		{ ...data.Gps },
		{ new: true, useFindAndModify: false }
	);
	return { profile, address, gps };
};
scheme.statics.UpdatePassword = async function(id: string, password: string): Promise<any> {
	const user: any = await this.findOne({ _id: id });
	assert(user, Msg.Auth.UserNotFound);
	const newPassword: any = await GenerateHash(password);
	const updation: any = await this.findByIdAndUpdate(
		user._id,
		{ password: newPassword },
		{ new: true, useFindAndModify: false }
	);
	return updation;
};
scheme.statics.DeleteOne = async function(id: string): Promise<any> {
	const user: any = await this.CollectOne(id);
	assert(user, Msg.Auth.UserNotFound);
	const gps: any = await GpsCollection.deleteOne({ _id: user.Profile.Address.Gps._id });
	const address: any = await AddressesCollection.deleteOne({ _id: user.Profile.Address._id });
	const profile: any = await ProfilesCollection.deleteOne({ _id: user.Profile._id });
	const userDeletion: any = await this.deleteOne({ _id: id });
	return { deletion: { user: userDeletion, profile, address, gps } };
};

/**
 * Authentication Methods
 */
scheme.statics.Register = async function(data: any): Promise<any> {
	const userId: string = v4();
	const profileId: string = v4();
	const addressId: string = v4();
	const gpsId: string = v4();
	try {
		const userCreation: any = await this.create({ Profile: profileId, ...data, _id: userId });
		const userRelation = await SubRolesCollection.AddUser(data.SubRole, userId);
		const profileCreation = await ProfilesCollection.create({ User: userId, Address: addressId, _id: profileId });
		const addressCreation = await AddressesCollection.create({ Profile: profileId, Gps: gpsId, _id: addressId });
		const gpsCreation = await GpsCollection.create({ Address: addressId, _id: gpsId });
		return {
			creation: {
				user: {
					creation: userCreation,
					relation: await userRelation
						.populate('Authorization')
						.populate('Role', '-SubRoles')
						.populate('Users', '-SubRole')
						.execPopulate()
				},
				profile: profileCreation,
				address: addressCreation,
				gps: gpsCreation
			}
		};
	} catch (err) {
		await this.deleteOne({ _id: userId });
		await ProfilesCollection.deleteOne({ _id: profileId });
		await AddressesCollection.deleteOne({ _id: addressId });
		await GpsCollection.deleteOne({ _id: gpsId });
		throw new Error(Msg.Auth.NotRegistered);
	}
};
scheme.statics.Login = async function(data: any): Promise<any> {
	const user = await this.findOne({
		$or: [ { email: data.username }, { contact: data.username } ]
	});
	assert(user, Msg.Auth.UserNotFound);
	const match: boolean = await ValidPassword(data.password, user.password);
	if (!match) throw new AssertionError({ message: Msg.Auth.InvalidCredentials });
	else if (!user.verified) throw new AssertionError({ message: Msg.Auth.UserNotVerified });
	else {
		const token = await user.Tokenize();
		await setSession(user._id as string, token as string);
		const setToken: any = await this.findByIdAndUpdate(user._id, { token }, { new: true, useFindAndModify: false });
		return { token, updation: setToken };
	}
};

scheme.statics.ForgetPassword = async function(email: string): Promise<any> {
	const user: any = await this.findOne({ email });
	assert(user, Msg.Auth.EmailNotRegistered);
	const { resetToken, resetTokenExpiry }: any = await user.GetResetPasswordToken();
	const updation: any = await this.findByIdAndUpdate(
		user._id,
		{ resetToken, resetTokenExpiry },
		{ new: true, useFindAndModify: false }
	);
	return updation;
};

scheme.statics.RefreshToken = async function(token: string): Promise<any> {
	const user: any = await this.findOne({ token });
	assert(user, Msg.Auth.UserNotFound);
	const session: any = await getSession(user._id);
	if (session != token) throw new AssertionError({ message: Msg.Auth.NoUserInSession });
	else {
		try {
			const decoded: any = jwt.verify(token, Jwt.Key);
			throw new AssertionError({ message: Msg.Auth.TokenNotExpired });
		} catch (err) {
			if (JwtTokenError(err)) {
				const newToken: string = jwt.sign(
					{ _id: user._id, email: user.email, password: user.password },
					Jwt.Key,
					{ expiresIn: 60 * Jwt.Expiry }
				);
				await setSession(user._id, newToken);
				const updation: any = await this.findByIdAndUpdate(
					user._id,
					{ token: newToken },
					{ new: true, useFindAndModify: false }
				);
				return { updation, newToken };
			} else {
				throw err; //new Error(err);
			}
		}
	}
};
scheme.statics.ResetPassword = async function(data: any): Promise<any> {
	const user: any = await this.findOne({
		resetToken: data.resetToken
	}).exec();
	assert(user, Msg.Auth.UserNotFound);
	const decoded: any = jwt.verify(data.resetToken, Jwt.Key);
	const newPassword: string = await GenerateHash(data.password);
	const newData = {
		password: newPassword,
		resetToken: undefined,
		resetTokenExpiry: undefined
	};
	const updation: any = await this.findByIdAndUpdate(user._id, newData, {
		new: true,
		useFindAndModify: false
	});
	return { updation };
};
scheme.statics.Logout = async function(id: string): Promise<any> {
	if ((await getSession(id)) != '') return await setSession(id, '');
	else throw new AssertionError({ message: Msg.Auth.NotLoggedOutNoSession });
};

/**
 * Action Hooks
 */
scheme.pre('find', function(): void {
	console.log(bold(red(`[${CollectionName}-Find][Pre] `)));
});
scheme.post('find', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-Find][Post] `)));
});

scheme.pre('findOne', function(): void {
	console.log(bold(red(`[${CollectionName}-FindOne][Pre] `)));
});
scheme.post('findOne', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-FindOne][Post] `)));
});

scheme.pre('save', async function(this: any, next: any): Promise<void> {
	console.log(bold(red(`[${CollectionName}-Save][Pre] `)));
	this.password = await GenerateHash(this.password);
	if (!this.password) console.log(bold(red(`Password Decoding Error`)));
	else console.log(bold(yellow(`Password Decoded`)));
	next();
});
scheme.post('save', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-Save][Post] `)));
});

scheme.pre('validate', function(): void {
	console.log(bold(red(`[${CollectionName}-Validate][Pre] `)));
});
scheme.post('validate', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-Validate][Post] `)));
});

scheme.pre('remove', function(): void {
	console.log(bold(red(`[${CollectionName}-Remove][Pre] `)));
});
scheme.post('remove', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-Remove][Post] `)));
});

scheme.pre('update', function(): void {
	console.log(bold(red(`[${CollectionName}-Update][Pre] `)));
});
scheme.post('update', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-Update][Post] `)));
});

scheme.pre('delete', function(): void {
	console.log(bold(red(`[${CollectionName}-Delete][Pre] `)));
});
scheme.post('delete', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-Delete][Post] `)));
});

scheme.pre('deleteOne', function(): void {
	console.log(bold(red(`[${CollectionName}-DeleteOne][Pre] `)));
});
scheme.post('deleteOne', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-DeleteOne][Post] `)));
});

scheme.pre('deleteMany', function(): void {
	console.log(bold(red(`[${CollectionName}-DeleteMany][Pre] `)));
});
scheme.post('deleteMany', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-DeleteMany][Post] `)));
});

scheme.pre('findByIdAndUpdate', function(): void {
	console.log(bold(red(`[${CollectionName}-FindByIdAndUpdate][Pre] `)));
});
scheme.post('findByIdAndUpdate', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-FindByIdAndUpdate][Post] `)));
});

scheme.pre('insertMany', function(): void {
	console.log(bold(red(`[${CollectionName}-InsertMany][Pre] `)));
});
scheme.post('insertMany', function(docs: any): void {
	console.log(bold(green(`[${CollectionName}-InsertMany][Post] `)));
});

const Collection: any = model(CollectionName, scheme);

module.exports = Collection;
