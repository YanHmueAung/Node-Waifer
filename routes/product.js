const router = require('express-promise-router')();
const ProductController = require('../controllers/product');
const { saveSingleFiles, saveMultipleFiles } = require('../utils/gallery');
const { product, AllSchema } = require('../utils/schema');
const { validator, validateParam } = require('../utils/validator');


router.post('/', [validator(product, create), saveMultipleFiles(), ProductController.add]);
router.get('/', ProductController.all);

router.route('/:id')
    .get([validateParam(AllSchema.id, 'id'), ProductController.get])
    .patch([validateParam(AllSchema.id, 'id'), ProductController.patch])
    .delete([validateParam(AllSchema.id, 'id'), ProductController.drop]);

module.exports = router;