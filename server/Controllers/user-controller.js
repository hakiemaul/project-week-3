const Users = require ('../Models/user.js')
const bcrypt = require('bcrypt') 
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
const jwt = require('jsonwebtoken')
const CronJob = require('cron').CronJob
const kue = require('kue'),queue = kue.createQueue()
const nodemailer = require("nodemailer");
require('dotenv').config()
const transporter = nodemailer.createTransport({
    service: 'gmail.com',
    auth: {
        user: process.env.HELLO,
        pass: process.env.WORLD
    }
});


function signup (req,res,next){
  Users.findOne({
    username: req.body.username
  },function(err,result){
    if(result){
      res.send(`Username already in use!`)
    }
    else{
      let hash = bcrypt.hashSync(req.body.password,salt)
      Users.create({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        win: 0
      },function(err,result){
        new CronJob('30 * * * * *', function() {
            var job = queue.create('email',{
              from:`Welcome ${result.username} <SpaceshipWar@gmail.com>`,
              to: `${result.email}`,
              subject: `Welcome ${result.username}`,
              text: 'WELCOME JING!!',
              html: `Welcome ${result.username} to SpaceshipWar\n@SpaceshipWar.Corp\nBest regards: Tirta, Aulia, Stedy`
            }).save(function(err){
              if(!err)
              console.log((job.data));
            })
            
            queue.process('email', function(job, done){
              transporter.sendMail(job.data, (error, info) => {
                  if (error) {
                      return console.log(error);
                  }
                  else{
                    console.log(`✔ Email Sent to ${job.data.to}`)
                  }        
              });
              done()
            });
            this.stop()    
        }, null,
          true, /* Start the job right now */
          'Asia/Jakarta' /* Time zone of this job. */
        );
        res.send(result)
      })
    }
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