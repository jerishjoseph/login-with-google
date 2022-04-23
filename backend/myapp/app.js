var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/save', function(req, res, next){
let date_time = new Date();
let date = ("0" + date_time.getDate()).slice(-2);

// get current month
let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

// get current year
let year = date_time.getFullYear();

// get current hours
let hours = date_time.getHours();

// get current minutes
let minutes = date_time.getMinutes();

// get current seconds
let seconds = date_time.getSeconds();

// prints date in YYYY-MM-DD format
let fullDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
var data = {'name': req.body.name,'email':req.body.email,'date': fullDate};
  console.log(data);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("logins");
    dbo.collection("logindata").insertOne(data, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted",res);
      db.close();
    });
  });
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('server started');
app.listen(3000);
module.exports = app;
