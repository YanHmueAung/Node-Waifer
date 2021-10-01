const router = require('express-promise-router')();
const UserController = require('../controllers/user');
const { user } = require('../utils/schema');
const { validator } = require('../utils/validator');

router.post('/register', [validator(user.register), UserController.register]);
router.get('/', UserController.all);
router.post('/login', UserController.login);
router.post('/add/role', UserController.addRole);
router.post('/remove/role', UserController.removeRole);
router.post('/add/permit', UserController.addPermit);
router.post('/remove/permit', UserController.removePermit);
router.get('/checkRole/:id', UserController.hasRole);
router.get('/checkPermit', UserController.hasPermit);

router.post('/aa/bb', [validator(user.register), (req, res) => res.send({ 'msg': 'you are incredible' })])

router.route('/:id')
    .get(UserController.get)
    .patch(UserController.patch)
    .delete(UserController.drop);

module.exports = router;