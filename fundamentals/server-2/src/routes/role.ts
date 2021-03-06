export {};

/**
 * Imports
 */
const express: any = require('express');
const router: any = express.Router();
const Controller: any = require('./../controllers/role');

/**
 * Routes
 */
router.get('/', Controller.fetchAll);
router.get('/extra', Controller.fetchAllExtra);
router.get('/:id', Controller.fetchOne);
router.get('/extra/:id', Controller.fetchOneExtra);

/**
 * Exports
 */
module.exports = router;
