/**
 * Imports
 */
const { MongoConnection, CollectionDropper }: any = require('./../database/mongoose');
const RolesSeeds: any = require('./../seeds/role');
const SubRolesSeeds: any = require('./../seeds/subrole');
const AuthorizationsSeeds: any = require('./../seeds/authorization');
const UsersSeeds: any = require('./../seeds/user');

/**
 * Main Script Launcher
 */
const LaunchScript: Function = async (): Promise<void> => {
	/**
   * Database Connection
   */
	await MongoConnection();

	/**
   * Database Refreshing
   */
	await CollectionDropper();

	/**
   * Database Filling Initial Dummy Data
   */
	await RolesSeeds();
	await SubRolesSeeds();
	await AuthorizationsSeeds();
	await UsersSeeds();

	/**
   * Exit Script Process
   */
	process.exit();
};

/**
 * Script Fire
 */
LaunchScript();
