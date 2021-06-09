export {};
import { red, gray, bold } from 'colors';
const { sequelize } = require('./../database/sequelize');

module.exports = async (): Promise<void> => {
	try {
		let tableOrder = [ 'natures', 'profiles', 'products', 'categories', 'tags', 'users' ];
		for (let table in tableOrder) {
			await sequelize.query('DROP TABLE IF EXISTS `' + table + '`');
		}
	} catch (err) {
		console.log(bold(red(err.message || null)));
	}
};
