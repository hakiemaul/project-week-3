const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
chai.use(chaiHttp)
const server = require('../app.js')
const Users = require('../Models/user.js')
const Rooms = require('../Models/room.js')
const should = chai.should()

var id = ""
var room_id =""

describe('Users',function(){
  beforeEach(function(done){
    var createUsers = new Users({
      username: 'testguy',
      password: 'testguy',
      email: 'test@gmail.com',
      win: 0
    })
    createUsers.save((err,res)=>{
      id = res._id
      done()
    })
  })
  
  afterEach(function(done){
    Users.remove({},function(err){
      done()
    })
  })
  
  describe(`list all users in database in GET /list`,function(){
    it('should return all users', function(done){
      chai.request(server)
      .get('/list')
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('array')
        done()
      })
    })
  })
  
  describe('Get one user in GET /:id',function(){
    it('should return one user', function(done){
      chai.request(server)
      .get(`/${id}`)
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('username')
        res.body.should.have.property('password')
        res.body.should.have.property('email')
        res.body.should.have.property('win')
        done()
      })
    })
  })
  
  describe('Delete one user in DELETE /:id',function(){
    it('should delete one user',function(done){
      chai.request(server)
      .delete(`/${id}`)
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
    })
  })
  
  describe('Edit one user in PUT /:id',function(){
    it('should edit one user',function(done){
      chai.request(server)
      .put(`/${id}`)
      .send({
        username: 'timo',
        password: 'timo',
        email: 'timo'
      })
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
    })
  })
  
  describe('Sign Up user in POST /signup',function(){
    it('should register a user',function(done){
      chai.request(server)
      .post(`/signup`)
      .send({
        username: 'tester',
        password: 'tester',
        email: 'testguy@gmail.com'
      })
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('username')
        res.body.should.have.property('password')
        res.body.should.have.property('email')
        res.body.should.have.property('win')
        done()
      })
    })
  })
  
  describe('Log in a user in POST /login',function(){
    it('should login a user and develop a token',function(done){
      chai.request(server)
      .post('/login')
      .send({
        username: 'testguy',
        password: 'testguy'
      })
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('_id')
        res.body.should.have.property('username')
        done()
      })
    })
  })  
})


describe('Rooms',function(){
  beforeEach(function(done){
    var createBlog = new Rooms({
      title: 'the legacy of test',
      user_id: mongoose.Types.ObjectId('4edd40c86762e0fb12000005')
    })
    createBlog.save((err,data)=>{
      user_id = data._id 
      done()
    })
  })


afterEach(function(done){
  Rooms.remove({},function(err){
    done()
  })
})

describe('Get all Rooms in GET /rooms',function(){
  it('should return all rooms',function(done){
    chai.request(server)
    .get('/rooms/all')
    .end((err,res)=>{
      console.log(res.body);
      res.should.have.status(200)
      res.body.should.be.a('array')
      // res.body.length.should.equal(1)
      done()
    })
  })
  // it('should return error')
})

describe('Create new Room in POST /rooms',function(){
  it('should return one room created',function(done){
    chai.request(server)
    .post('/rooms')
    .send({
      title: 'asli',
      user_id: mongoose.Types.ObjectId('4edd40c86762e0fb12000005')
    })
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('title')
      res.body.should.have.property('user_id')
      done()
    })
  })
  // it('should return error')
})

describe('Delete Room in DELETE /rooms/:id',function(){
  it('should delete one room',function(done){
    chai.request(server)
    .delete(`/rooms/${user_id}`)
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('object')
      done()
      })
    })
  })
  
describe('Edit Room in PUT /rooms/:id',function(){
  it('should update one room',function(done){
    chai.request(server)
    .put(`/rooms/${user_id}`)
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('object')
      done()
      })
    })
  })

describe('Get one Blog in GET /rooms/:id',function(){
  it('should get one room',function(done){
    chai.request(server)
    .get(`/rooms/${user_id}`)
    .end((err,res)=>{
      console.log(res.body);
      res.should.have.status(200)
      res.body.should.be.a('object')
      done()
      })
    })
  })  
})