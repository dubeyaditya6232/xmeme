require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memeRouter = require('./routes/memeRouter');

var app = express();

app.use(methodOverride('_method'));

mongoose.set('useFindAndModify', false);

//Connecting to database
mongoDB_URL="mongodb://127.0.0.1/xmeme";
mongoose.connect(mongoDB_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise=global.Promise;
db=mongoose.connection;

//check database connection
db.on('connected',()=>{
  console.log('Connected to dataBase');
})
db.on('error',()=>{
  console.log('database Connection Error :');
})
// database connection done

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/memes',memeRouter);

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
console.log("server hosted on Port 8081");
module.exports = app;
