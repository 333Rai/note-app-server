const Router = require('express');
const controller = require('../controllers/authController');
const router = new Router();

router.post('/auth/signup', controller.signup);
router.post('/auth/signin', controller.signin);
router.post('/auth/signout', controller.signout);
router.get('/auth/refresh', controller.refresh);

router.get('/users', controller.fetchAllUsers);
router.get('/users/:id', controller.fetchOneUser);
router.delete('/users', controller.removeAllUsers);
router.delete('/users/:id', controller.removeOneUser);

module.exports = router;
