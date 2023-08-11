const express = require('express')
const router = express.Router();
const userService = require('../service/userService');

router.post('/usersignup',userService.userSignUp);
router.get('/userdatalist',userService.getUserList);
router.post('/usersignin',userService.userSignIn);
router.post('/createpost',userService.userPost);
router.get('/getuserpost',userService.getUserPost);
 
module.exports = router;

