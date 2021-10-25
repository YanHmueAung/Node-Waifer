const router = require('express-promise-router')();
const UserController = require('../controllers/user');
const { user, AllSchema } = require('../utils/schema');
const { validator, validateParam } = require('../utils/validator');

router.post('/register', [validator(user.register), UserController.register]);
router.get('/', UserController.all);
router.post('/login', UserController.login);
router.post('/add/role', [validator(user.addRole), UserController.addRole]);
router.post('/remove/role', [validator(user.addRole), UserController.removeRole]);
router.post('/add/permit', [validator(user.addPermit), UserController.addPermit]);
router.post('/remove/permit', [validator(user.addPermit), UserController.removePermit]);
router.get('/checkRole/:id', UserController.hasRole);
router.get('/checkPermit', UserController.hasPermit);

router.post('/aa/bb', [validator(user.register), (req, res) => res.send({ 'msg': 'you are incredible' })])

router.route('/:id')
    .get([validateParam(AllSchema.id, 'id'), UserController.get])
    .patch([validateParam(AllSchema.id, 'id'), UserController.patch])
    .delete([validateParam(AllSchema.id, 'id'), UserController.drop]);

module.exports = router;