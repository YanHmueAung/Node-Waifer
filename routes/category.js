const router = require('express-promise-router')();
const CategoryController = require('../controllers/category');
const { saveSingleFiles, saveMultipleFiles } = require('../utils/gallery');

router.post('/', [saveSingleFiles(), CategoryController.add]);
router.get('/', CategoryController.all);

router.route('/:id')
    .get(CategoryController.get)
    .patch(CategoryController.patch)
    .delete(CategoryController.drop);

module.exports = router;