const express: any = require('express')
const router: any = express.Router()

const natureController: any = require('./../controllers/nature')

/* APIs */
router.get('/', natureController.fetchAll)
router.get('/:id', natureController.filterOne)
router.get('/count/all', natureController.countAll)
router.post('/', natureController.create)
router.post('/search/all', natureController.search)
router.post('/search/single', natureController.searchOne)
router.patch('/:id', natureController.update)
router.delete('/:id', natureController.remove)

module.exports = router
