var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
// express session
const session = require('express-session');
// connect flash 
const flash = require('connect-flash');
// import mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/db_hotel');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// router admin
const adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Methode override
app.use(methodOverride('_method'));
// express session 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
// Batas express session 
// flash 
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// menambahkan template yang sudah di install menggunakan npm 
app.use('/tabler', express.static(path.join(__dirname, 'node_modules/@tabler/core/dist')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// admin
app.use('/admin', adminRouter);

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
  res.render('error');
});

module.exports = app;
