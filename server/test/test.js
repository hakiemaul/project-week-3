const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const server = require('../app.js')
const Users = require('../Models/user.js')
const should = chai.should()

var id = ""

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