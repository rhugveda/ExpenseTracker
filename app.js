var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//firebase
// var admin = require('firebase-admin');
// var serviceAccount = require('D:/ExpenseTracker/expensetracker-951e5-firebase-adminsdk-5tl1x-0717ef971c.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://expensetracker-b8706.firebaseio.com/'
// });


var firebase = require('firebase');
var config = {
  apiKey: "AIzaSyDEqR-tbCFvOiSbZVxfE5p827c_AE1ZNJo",
  authDomain: "expensetracker-b8706.firebaseapp.com",
  databaseURL: "https://expensetracker-b8706.firebaseio.com",
  projectId: "expensetracker-b8706",
  storageBucket: "expensetracker-b8706.appspot.com",
  messagingSenderId: "263629388387"
};
firebase.initializeApp(config);


//// 




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
