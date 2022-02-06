var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var postRouter = require('./routes/post');
var userRouter = require('./routes/user');

var app = express();

const { mongoUrl } = require('./config');
const connect = mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})

connect.then((db) => {
  console.log("Database connected successfully!");
}, (err) => { // we can supply two callbacks here, an occurence of err will automatically go to the second callback
  console.log(err);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add routes with the specific sub-url they route to 
app.use('/', indexRouter);
app.use('/signup', signupRouter); 
app.use('/login', loginRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
