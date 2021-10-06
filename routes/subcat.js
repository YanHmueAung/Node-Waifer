const router = require('express-promise-router')();
const SubcatController = require('../controllers/subcat');
const { saveSingleFiles, saveMultipleFiles } = require('../utils/gallery')

router.post('/', [saveSingleFiles(), SubcatController.add]);
router.get('/', SubcatController.all);

router.route('/:id')
    .get(SubcatController.get)
    .patch(SubcatController.patch)
    .delete(SubcatController.drop);

module.exports = router;