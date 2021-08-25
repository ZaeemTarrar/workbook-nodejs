export {}

/**
 * Imports
 */
const express: any = require('express')
const router: any = express.Router()
const Controller: any = require('./../controllers/auth')

/**
 * Routes
 */
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/forgetPassword', Controller.forgetPassword)
router.post('/resetPassword', Controller.resetPassword)
// router.post('/logout', Controller.logout);
// router.post('/refreshToken', Controller.refreshToken);

/**
 * Exports
 */
module.exports = router
