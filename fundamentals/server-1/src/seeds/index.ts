import { cyan, red, green, blue, yellow, bold, gray } from 'colors';
import { T_Nature } from './../contracts/model/nature';
const Nature = require('./../models/nature');

module.exports.Seeder = (): Promise<void> => {
	console.log(bold(cyan(`\nInitializing Database Seeder`)));
	/**
     * Dummy Data Loadings
     */
	let natures: T_Nature[] = require('./../data/nature.json').data;
	/**
     * Seed Promises
     */
	let Natures_Promise: Promise<void> = Nature.bulkCreate(natures).then((result: any): any => {
		console.log(bold(cyan(`Nature Table Seeded`)));
		return result;
	});
	/**
     * Main Seeding Chain
     */
	const SeedChain: Promise<any[]> = Promise.all([ Natures_Promise ]);
	return SeedChain.then((values: any) => {
		values.map((value: any, index: any): void => {
			// Do Something
		});
	})
		.then((): void => {
			console.log(bold(cyan(`Database Tables Seeded Successfully`)));
		})
		.catch((err: Error): void => {
			console.log(red('Database Tables Seeding Error: '), gray(JSON.stringify(err, null, 2)));
		});
};
