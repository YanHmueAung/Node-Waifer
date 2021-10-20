const router = require('express-promise-router')();
const childcatController = require('../controllers/childcat');
const { saveSingleFiles, saveMultipleFiles } = require('../utils/gallery');
const { childcategory, AllSchema } = require('../utils/schema');
const { validator, validateParam } = require('../utils/validator');


router.post('/', [validator(childcategory.create), saveSingleFiles(), childcatController.add]);
router.get('/', childcatController.all);

router.route('/:id')
    .get([validateParam(AllSchema.id, 'id'), childcatController.get])
    .patch([validateParam(AllSchema.id, 'id'), childcatController.patch])
    .delete([validateParam(AllSchema.id, 'id'), childcatController.drop]);

module.exports = router;