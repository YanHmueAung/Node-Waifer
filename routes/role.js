const router = require('express-promise-router')();
const RoleController = require('../controllers/role');
const { validateToken, validateParam } = require('../utils/validator');
const { AllSchema } = require('../utils/schema');

router.post('/', RoleController.add);
router.post('/add/permit', RoleController.addPermit);
router.post('/remove/permit', RoleController.removePermit);
router.get('/', RoleController.all);

router.route('/:id')
    .get([validateParam(AllSchema.id, 'id'), RoleController.get])
    .patch(RoleController.patch)
    .delete(RoleController.drop);

module.exports = router;