export {};

/**
 * Imports
 */
const express: any = require('express');
const router: any = express.Router();
const Controller: any = require('./../controllers/feed');

/**
 * Routes
 */
router.get('/private/all', Controller.fetchAllPrivate);
router.get('/private/user/:id', Controller.fetchAllUserPrivate);
router.get('/public/all', Controller.fetchAllPublic);
router.get('/public/user/:id', Controller.fetchAllUserPublic);
router.get('/public/single/:id', Controller.fetchOnePublic);
router.get('/private/single/:id', Controller.fetchOnePrivate);
router.post('/', Controller.create);
router.patch('/:id', Controller.update);
router.delete('/:id', Controller.remove);

/**
 * Exports
 */
module.exports = router;
