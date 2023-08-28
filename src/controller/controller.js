const express = require('express')
const router = express.Router();
const userService = require('../service/userService');
const authenticate = require('../auth');

router.post('/usersignup',userService.userSignUp);
router.get('/userdatalist',userService.getUserList);
router.post('/usersignin',userService.userSignIn);
router.get('/alluserpost',userService.allUserPost);
router.post('/createpost',authenticate,userService.userPost);
router.get('/getuserpost',authenticate,userService.getUserPost);
 
module.exports = router;

