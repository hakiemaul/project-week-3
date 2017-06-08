const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  win: Number
})

var User = mongoose.model('Users',userSchema)

module.exports = User