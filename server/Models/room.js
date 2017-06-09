const mongoose = require('mongoose')
const Schema = mongoose.Schema

var roomSchema = new Schema ({
  title: String,
  creator:String,
  user_id: {type:Schema.Types.ObjectId,ref:'User'}
})

var room = mongoose.model('Rooms',roomSchema)

module.exports = room