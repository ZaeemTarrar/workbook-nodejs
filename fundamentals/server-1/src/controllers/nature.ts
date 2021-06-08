export {};
import sequelize, { Op } from 'sequelize';
import { T_Nature } from './../contracts/model/nature';
import {
	NOT_FOUND,
	INTERNAL_SERVER_ERROR,
	OK,
	CREATED,
	BAD_REQUEST,
	METHOD_NOT_ALLOWED,
	NO_CONTENT,
	NOT_MODIFIED
} from 'http-status';

const { CleanBlack } = require('./../utils/objects');
const Nature = require('./../models/nature');
const R = require('./../utils/response');

module.exports.countAll = (req: any, res: any, next: any) => {
	Nature.findAndCountAll({})
		.then((result: any) => {
			if (result != 0) res.json(R(OK, null, result));
			else res.json(R(NO_CONTENT, null, result));
		})
		.catch((e: Error) => {
			res.json(R(BAD_REQUEST, `Promise - Error: ${e.message || null}`));
		});
};

module.exports.fetchAll = (req: any, res: any, next: any) => {
	Nature.findAll({})
		.then((result: any) => {
			if (result.length > 0) res.json(R(OK, null, result));
			else res.json(R(NO_CONTENT, null, result));
		})
		.catch((e: Error) => {
			res.json(R(BAD_REQUEST, `Promise - Error: ${e.message || null}`));
		});
};

module.exports.filterOne = (req: any, res: any, next: any) => {
	try {
		let id: number = req.params.id;
		Nature.findByPk(id)
			.then((result: any) => {
				if (result) res.json(R(OK, null, result));
				else res.json(R(NO_CONTENT, null, result));
			})
			.catch((e: Error) => {
				res.json(R(BAD_REQUEST, `Promise - Error: ${e.message || null}`));
			});
	} catch (err) {
		res.json(R(BAD_REQUEST, `Try Catch - Error: ${err.message || null}`));
	}
};

module.exports.searchOne = (req: any, res: any, next: any) => {
	try {
		let nature: any = {
			id: req.body.id,
			name: req.body.name,
			active: req.body.active
		};
		nature = CleanBlack(nature);
		Nature.findOne({ where: { ...nature } })
			.then((result: any) => {
				if (result) res.json(R(OK, null, result));
				else res.json(R(NO_CONTENT, null, result));
			})
			.catch((e: Error) => {
				res.json(R(BAD_REQUEST, `Promise - Error: ${e.message || null}`));
			});
	} catch (err) {
		res.json(R(BAD_REQUEST, `Try Catch - Error: ${err.message || null}`));
	}
};

module.exports.search = (req: any, res: any, next: any) => {
	try {
		let nature: any = {
			id: req.body.id,
			name: req.body.name,
			active: req.body.active
		};
		nature = CleanBlack(nature);
		Nature.findAll({ where: { ...nature } })
			.then((result: any) => {
				if (result.length > 0) res.json(R(OK, null, result));
				else res.json(R(NO_CONTENT, null, result));
			})
			.catch((e: Error) => {
				res.json(R(BAD_REQUEST, `Promise - Error: ${e.message || null}`));
			});
	} catch (err) {
		res.json(R(BAD_REQUEST, `Try Catch - Error: ${err.message || null}`));
	}
};

module.exports.create = (req: any, res: any, next: any) => {
	try {
		let nature: T_Nature = {
			name: req.body.name,
			active: req.body.active
		};
		Nature.create(nature)
			.then((result: any) => {
				res.json(R(CREATED, null, result));
			})
			.catch((e: Error) => {
				res.json(R(BAD_REQUEST, `Promise - Error: ${e.message || null}`));
			});
	} catch (err) {
		res.json(R(BAD_REQUEST, `Try Catch - Error: ${err.message || null}`));
	}
};

module.exports.remove = (req: any, res: any, next: any) => {
	try {
		let id: number = req.params.id;
		Nature.findAll({ where: { id } })
			.then((result: any) => {
				return result[0] || undefined;
			})
			.then((result: any) => {
				if (result) {
					result.destroy();
					res.json(R(OK, 'Item Deleted'));
				} else {
					res.json(R(METHOD_NOT_ALLOWED, `No Item Found, To Be Removed`));
				}
			})
			.catch((e: Error) => {
				res.json(R(BAD_REQUEST, `Promise - Error: ${e.message || null}`));
			});
	} catch (err) {
		res.json(R(BAD_REQUEST, `Try Catch - Error: ${err.message || null}`));
	}
};

module.exports.update = (req: any, res: any, next: any) => {
	try {
		let id: number = req.params.id;
		let nature: any = {
			name: req.body.name,
			active: req.body.active
		};
		nature = CleanBlack(nature);
		Nature.findAll({ where: { id } })
			.then((result: any) => {
				return result[0] || undefined;
			})
			.then((result: any) => {
				if (result) {
					for (let prop in nature) {
						if (nature.hasOwnProperty(prop)) result[prop] = nature[prop];
					}
				}
				return result;
			})
			.then((result: any): void => {
				if (result) {
					result.save();
					res.json(R(OK, `Item Updated`));
				} else {
					res.json(R(METHOD_NOT_ALLOWED, 'No Item Found, To Be Updated'));
				}
			})
			.catch((e: Error) => {
				res.json(R(NOT_MODIFIED, `Promise - Error: ${e.message || null}`));
			});
	} catch (err) {
		res.json(R(BAD_REQUEST, `Try Catch - Error: ${err.message || null}`));
	}
};
