const router = require('express-promise-router')();
const CategoryController = require('../controllers/category');
const { category, AllSchema } = require('../utils/schema');
const { validator, validateParam } = require('../utils/validator');
const { saveSingleFiles, saveMultipleFiles } = require('../utils/gallery');

router.post('/', [validator(category.create), saveSingleFiles(), CategoryController.add]);
router.get('/', CategoryController.all);

router.route('/:id')
    .get([validateParam(AllSchema.id, 'id'), CategoryController.get])
    .patch([validateParam(AllSchema.id, 'id'), CategoryController.patch])
    .delete([validateParam(AllSchema.id, 'id'), CategoryController.drop]);

module.exports = router;