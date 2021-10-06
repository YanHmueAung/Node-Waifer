const router = require('express-promise-router')();
const childcatController = require('../controllers/childcat');
const { saveSingleFiles, saveMultipleFiles } = require('../utils/gallery');

router.post('/', [saveSingleFiles(), childcatController.add]);
router.get('/', childcatController.all);

router.route('/:id')
    .get(childcatController.get)
    .patch(childcatController.patch)
    .delete(childcatController.drop);

module.exports = router;