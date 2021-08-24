const userExpress: any = require('express')
const userRouter: any = userExpress.Router()

const userController: any = require('./../controllers/user')

/* APIs */
userRouter.get('/', userController.fetchAll)
userRouter.get('/:id', userController.filterOne)
userRouter.get('/count/all', userController.countAll)
userRouter.post('/', userController.create)
userRouter.post('/search/all', userController.search)
userRouter.post('/search/single', userController.searchOne)
userRouter.patch('/:id', userController.update)
userRouter.delete('/:id', userController.remove)

module.exports = userRouter
