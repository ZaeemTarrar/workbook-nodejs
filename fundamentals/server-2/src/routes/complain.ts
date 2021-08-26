export {};

/**
 * Imports
 */
const express: any = require('express');
const router: any = express.Router();
const Controller: any = require('./../controllers/complain');

/**
 * Routes
 */
router.get('/', Controller.fetchAll);
router.get('/:id', Controller.fetchOne);
router.get('/user/:id', Controller.fetchAllOfUser);
router.post('/', Controller.create);
router.patch('/:id', Controller.update);
router.delete('/:id', Controller.remove);

/**
 * Exports
 */
module.exports = router;
