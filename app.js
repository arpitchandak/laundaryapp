var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

var loginRouter = require('./routes/loginRouter');
var registerRouter = require('./routes/registerRouter');
var AllDataRoute = require('./routes/Cart/AllDataRoute')
var SlidersRoutes = require('./routes/DashBoard/SlidersRoutes')
var OurServices = require('./routes/DashBoard/OurServices')
var OffersTypes = require('./routes/DashBoard/OffersTypes')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

let MONGODB_URI= "mongodb+srv://@cluster0-1ixu1.mongodb.net/"
let DB_NAME= "laundary_data_store"
let USERNM= "arpit1011"
let PASS= "arpit1011"



mongoose.connect(MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  user: USERNM,
  pass: PASS,
  dbName: DB_NAME
})
.then( () => {
  console.log('mongodb connected...')
})
.catch( err => console.log(err.message))


// Enable cors
app.use('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update later
  // Allowed headers
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Allowed request methods
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE"
  );
  next();
});


app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/cart',AllDataRoute)
app.use('/dashboard',SlidersRoutes)
app.use('/dashboard',OurServices)
app.use('/dashboard',OffersTypes)



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
