export {};

/**
 * Imports
 */
const express: any = require('express');
const router: any = express.Router();
const Controller: any = require('./../controllers/auth');

/**
 * Routes
 */
router.post('/register', Controller.register);
router.post('/login', Controller.login);
// router.post('/logout', Controller.logout);
// router.post('/refreshToken/:token', Controller.refreshToken);
// router.post('/forgotPassword', Controller.forgotPassword);

/**
 * Exports
 */
module.exports = router;
