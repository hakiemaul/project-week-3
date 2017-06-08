var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
var db_config = {
  development:'mongodb://battleship:battleship@ds115352.mlab.com:15352/battleship_grayfox',
  test: 'mongodb://battleship:battleship@ds115352.mlab.com:15352/battleship_grayfox-tes'
}
var current_env = app.settings.env //developnent / test / production
mongoose.connect(db_config[current_env],function(err,res){
  if(err){
    console.log('error database',err);
  }
  else{
    console.log('connected to database', db_config[current_env]);
  }
})
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
