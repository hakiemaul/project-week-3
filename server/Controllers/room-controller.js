const Rooms = require('../Models/room.js')

function createRoom (req,res,next){
  Rooms.create({
    title: req.body.title,
    creator: req.body.creator,
    user_id: req.body.user_id
  },function(err,result){
    res.send(result)
  })
}

function editRoom (req,res,next){
  Rooms.findOne({
    _id: req.params.id
  },function(err,result){
    Rooms.updateOne({
      _id: req.params.id
    },{
      title: req.body.title || result.title,
      players: req.body.players || result.players
    },function(err,result){
      res.send(`${req.body.title} Updated!`)
    })
  })
}

function deleteRoom (req,res,next){
  Rooms.remove({
    _id: req.params.id
  },function(err,result){
    res.send(`Delete Success!`)
  })
}

function getOneRoom (req,res,next){
  Rooms.findOne({
    _id:req.params.id
  },function(err,result){
    res.send(result)
  })
}

function listRooms (req,res,next){
  Rooms.find({},function(err,result){
    res.send(result)
  })
}

module.exports = {
  listRooms,getOneRoom,deleteRoom,editRoom,createRoom
}