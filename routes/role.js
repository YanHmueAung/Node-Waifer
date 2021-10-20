const router = require('express-promise-router')();
const RoleController = require('../controllers/role');
const { validateToken, validateParam } = require('../utils/validator');
const { AllSchema } = require('../utils/schema');
const { role } = require('../utils/schema');
const { validator, validateParam } = require('../utils/validator');


router.post('/', [validator(role.create), RoleController.add]);
router.post('/add/permit', [validator(role.roleAddPermit), RoleController.addPermit]);
router.post('/remove/permit', [validator(role.roleAddPermit), RoleController.removePermit]);
router.get('/', RoleController.all);

router.route('/:id')
    .get([validateParam(AllSchema.id, 'id'), RoleController.get])
    .patch([validateParam(AllSchema.id, 'id'), RoleController.patch])
    .delete([validateParam(AllSchema.id, 'id'), RoleController.drop]);

module.exports = router;