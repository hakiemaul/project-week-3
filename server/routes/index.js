var express = require('express');
var router = express.Router();
const Users = require('../Controllers/user-controller.js')
const Rooms = require('../Controllers/room-controller.js')
/* GET Users Routes. */
router.get('/list',Users.listUsers)
router.get('/:id',Users.getOneUser)
router.put('/:id',Users.updateUser)
router.post('/signup',Users.signup)
router.post('/login',Users.login)
router.delete('/:id',Users.deleteUser)


/* GET Rooms Routes. */
router.get('/rooms/all',Rooms.listRooms)
router.get('/rooms/:id',Rooms.getOneRoom)
router.put('/rooms/:id',Rooms.editRoom)
router.delete('/rooms/:id',Rooms.deleteRoom)
router.post('/createroom',Rooms.createRoom)

module.exports = router;
