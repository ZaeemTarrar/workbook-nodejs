export {};
const { INTEGER, STRING, BOOLEAN, DATE, DOUBLE, TEXT } = require('sequelize').DataTypes;
const { sequelize } = require('./../database/sequelize');

/* ORM => Object Relational Model */
const tableName: string = 'products';
const Table: any = sequelize.define(
	tableName,
	{
		id: {
			type: INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: STRING,
			allowNull: false
		},
		available: {
			type: BOOLEAN,
			allowNull: true,
			defaultValue: true
		},
		price: {
			type: INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		discount: {
			type: DOUBLE,
			allowNull: true,
			defaultValue: 0
		},
		snap: {
			type: TEXT,
			allowNull: true,
			defaultValue: undefined
		},
		brand: {
			type: STRING,
			allowNull: true
		},
		model: {
			type: STRING,
			allowNull: true
		},
		manufacturedAt: {
			type: DATE,
			allowNull: true,
			defaultValue: undefined
		},
		expiry: {
			type: DATE,
			allowNull: true,
			defaultValue: undefined
		}
	},
	{
		freezeTableName: false, // Pluralization,
		tableName: tableName,
		timestamps: true
	}
);

module.exports = Table;
