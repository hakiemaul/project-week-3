var express = require('express');
var router = express.Router();
const Users = require('../Controllers/user-controller.js')
/* GET home page. */
router.get('/list',Users.listUsers)
router.get('/:id',Users.getOneUser)
router.put('/:id',Users.updateUser)
router.post('/signup',Users.signup)
router.post('/login',Users.login)
router.delete('/:id',Users.deleteUser)

module.exports = router;
