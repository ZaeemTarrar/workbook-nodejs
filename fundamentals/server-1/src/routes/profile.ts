const profileExpress: any = require('express')
const profileRouter: any = profileExpress.Router()

const profileController: any = require('./../controllers/profile')

/* APIs */
profileRouter.get('/', profileController.fetchAll)
profileRouter.get('/:id', profileController.filterOne)
profileRouter.get('/count/all', profileController.countAll)
profileRouter.post('/', profileController.create)
profileRouter.post('/search/all', profileController.search)
profileRouter.post('/search/single', profileController.searchOne)
profileRouter.patch('/:id', profileController.update)
profileRouter.patch('/by-user/:userId', profileController.updateByUser)
profileRouter.delete('/:id', profileController.remove)

module.exports = profileRouter
