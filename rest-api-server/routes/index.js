var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/getuser', UserController.getUser);

router.post('/insert', UserController.insertUser);

router.post('/user/played', UserController.incrPlayed);

router.post('/user/correct', UserController.incrCorrect);

router.post('/user/wrong', UserController.incrWrong);

module.exports = router;
