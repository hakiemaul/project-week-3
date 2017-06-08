const Users = require ('../Models/user.js')
const bcrypt = require('bcrypt') 
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
const jwt = require('jsonwebtoken')
require('dotenv').config()

function signup (req,res,next){
  let hash = bcrypt.hashSync(req.body.password,salt)
  Users.create({
    username: req.body.username,
    password: hash,
    email: req.body.email,
    win: 0
  },function(err,result){
    res.send(result)
  })
}

function login (req,res,next){
  Users.findOne({
    username: req.body.username
  },function(err,result){
    if(!result){
      res.send(`Invalid Username`)
    }
    else{
      if(bcrypt.compare(req.body.password,result.password)){
        let token = {
          _id: result._id,
          username: result.username
        }
        res.send(token)
      }
      else{
        res.send(`Invalid Password`)
      }
    }
  })
}

function listUsers (req,res,next){
  Users.find({},function(err,result){
    res.send(result)
  })
}

function getOneUser (req,res,next){
  Users.findOne({
    _id: req.params.id
  },function(err,result){
    res.send(result)
  })
}

function updateUser (req,res,next){
  Users.findOne({
    _id: req.params.id
  },function(err,result){
    Users.updateOne({
      _id: req.params.id
    },{
      username: req.body.username || result.username,
      password: req.body.password || result.password,
      email: req.body.email || result.email,
      win: req.body.win || result.win
    },function(err,result){
      res.send(`${req.body.username} Updated!`)
    })
  })
}

function deleteUser (req,res,next){
  Users.remove({
    _id: req.params.id
  },function(err,result){
    res.send(`Delete Success!`)
  })
}

module.exports = {
  deleteUser,updateUser,getOneUser,listUsers,login,signup
}