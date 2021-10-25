const router = require('express-promise-router')();
const OrderController = require('../controllers/order');
const { validateToken } = require('../utils/validator');

router.post('/', [validateToken(), OrderController.add]);
router.get('/', OrderController.all);

router.route('/:id')
    .get(OrderController.get)
    .patch(OrderController.patch)
    .delete(OrderController.drop);

module.exports = router;