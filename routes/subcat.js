const router = require('express-promise-router')();
const SubcatController = require('../controllers/subcat');
const { subcategory, AllSchema } = require('../utils/schema');
const { validator, validateParam } = require('../utils/validator');
const { saveSingleFiles, saveMultipleFiles } = require('../utils/gallery')

router.post('/', [validator(subcategory.create), saveSingleFiles(), SubcatController.add]);
router.get('/', SubcatController.all);

router.route('/:id')
    .get([validateParam(AllSchema.id, 'id'), SubcatController.get])
    .patch([validateParam(AllSchema.id, 'id'), SubcatController.patch])
    .delete([validateParam(AllSchema.id, 'id'), SubcatController.drop]);

module.exports = router;