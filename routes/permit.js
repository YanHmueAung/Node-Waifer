const router = require('express-promise-router')();
const PermitController = require('../controllers/permit');

router.post('/', PermitController.add);
router.get('/', PermitController.all);

router.route('/:id')
    .get(PermitController.get)
    .patch(PermitController.patch)
    .delete(PermitController.drop);

module.exports = router;