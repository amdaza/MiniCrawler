var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
let config = require('config');

var indexRouter = require('./routes/index');
const crawlURL = require('./routes/crawlURL')

var app = express();
const port = 5000;

// don't show the log when it is test
if (config.util.getEnv('NODE_ENV') !== 'test') {
  // use morgan to log at command line
  app.use(logger('dev'));
}

// Cross domain avoid
app.options('*', cors());

app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

function getOKResponse (res, data) {
  return res.json({ result: "OK", data: data });
}

function getErrorResponse (res, data) {
  console.log("data error", data)
  return res.json({ result: "ERROR", data: data });
}

// Routes
app.use('/lasturls', function (req, res, next) {

  
});


app.use('/crawl/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  console.log('ID:', req.params.id);
  
  crawlURL(req.params.id)
  .then((links) => {
    getOKResponse(res,links);

    res.status(200)
      .send();
  }).catch((err) => {
    getErrorResponse(res,err.message);

    res.status(400)
      .send();
  });;
  
});

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

