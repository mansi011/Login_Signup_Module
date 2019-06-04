const promiseRouter = require('express-promise-router');
const router = promiseRouter();
const passport = require('passport');
//const roleCheck = require('./../../middlewares/rolecheck');
require('./../../middlewares/passport')(passport)

const UserAuthController=require('./../../controllers/index').UserAuthController;


router.post('/user/signup', UserAuthController.createUser);

router.post('/user/login', UserAuthController.Login);


module.exports = router;
