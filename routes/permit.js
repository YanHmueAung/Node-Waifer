const router = require('express-promise-router')();
const PermitController = require('../controllers/permit');
const { permit, AllSchema } = require('../utils/schema');
const { validator, validateParam } = require('../utils/validator');


router.post('/', [validator(permit.create), PermitController.add]);
router.get('/', PermitController.all);

router.route('/:id')
    .get([validateParam(AllSchema.id, 'id'), PermitController.get])
    .patch([validateParam(AllSchema.id, 'id'), PermitController.patch])
    .delete([validateParam(AllSchema.id, 'id'), PermitController.drop]);

module.exports = router;