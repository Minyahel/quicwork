var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo');
var session = require('express-session');

var indexRouter = require('./routes/index');
var postRouter = require('./routes/post');
var userRouter = require('./routes/user');

var app = express();

const { mongoUrl, mongoStoreUrl } = require('./util/config');
const connect = mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(
    (db) => {
        console.log('Database connected successfully!');
    },
    (err) => {
        // we can supply two callbacks here, an occurence of err will automatically go to the second callback
        console.log(err);
    }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// initialize expression session
app.use(
    session({
        secret: 'my secret key',
        resave: false,
        saveUninitialized: false,
        store: mongoStore.create({
            mongoUrl: mongoStoreUrl,
            ttl: 14 * 24 * 60 * 60,
            autoRemove: 'native'
        })
    })
);

// add routes with the specific sub-url they route to
app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500).json({
        message: err.message,
        devMessage: err.metadata
    });
});

module.exports = app;
