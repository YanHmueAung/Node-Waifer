const router = require('express-promise-router')();
const UserController = require('../controllers/user');
const CategoryController = require('../controllers/category');
const OrderController = require('../controllers/order');

const ProductController = require('../controllers/product');
const { validator, validatePage, validateToken } = require('../utils/validator');
const { user, AllSchema } = require('../utils/schema');

router.post('/login', [validator(user.login), UserController.login]);
router.post('/register', [validator(user.register), UserController.register]);
router.get('/cats', CategoryController.all);
router.get('/products/:page', [validatePage(AllSchema.page, "page"), ProductController.paginate]);
router.post('/order', [validateToken(), OrderController.add]);
router.get('/orders', [validateToken(), OrderController.getMyOrder]);


// router.route('/:id')
//     .get(apiController.get)
//     .patch(apiController.patch)
//     .delete(apiController.drop);
router.post("/login", (req, res) => {

})

module.exports = router;