const express: any = require('express');
const router: any = express.Router();

const con: any = require('./../controllers/nature');

/* APIs */
router.get('/', con.fetchAll);
router.get('/:id', con.filterOne);
router.get('/count/all', con.countAll);
router.post('/', con.create);
router.post('/search/all', con.search);
router.post('/search/single', con.searchOne);
router.patch('/:id', con.update);
router.delete('/:id', con.remove);

module.exports = router;
