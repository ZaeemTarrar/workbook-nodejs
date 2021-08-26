export {};

/**
 * Imports
 */
const express: any = require('express');
const router: any = express.Router();
const Controller: any = require('./../controllers/subrole');

/**
 * Routes
 */
router.get('/', Controller.fetchAll);
router.get('/extra', Controller.fetchAllExtra);
router.get('/extra/:id', Controller.fetchOneExtra);
router.get('/:id', Controller.fetchOne);
router.post('/', Controller.create);
router.patch('/:id', Controller.update);
router.delete('/:id', Controller.remove);

/**
 * Exports
 */
module.exports = router;
