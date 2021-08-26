export {};

/**
 * Imports
 */
const express: any = require('express');
const router: any = express.Router();
const Controller: any = require('./../controllers/user');

/**
 * Routes
 */
router.get('/', Controller.fetchAll);
router.get('/extra', Controller.fetchAllExtra);
router.get('/:id', Controller.fetchOne);
router.get('/extra/:id', Controller.fetchOneExtra);
router.patch('/password/:id', Controller.updatePassword);
router.patch('/:id', Controller.update);
router.delete('/:id', Controller.remove);

/**
 * Exports
 */
module.exports = router;
