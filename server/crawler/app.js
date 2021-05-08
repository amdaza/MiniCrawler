var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();
const port = 5000;

var crawlURL = require('./crawlURL')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/crawl/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  console.log('ID:', req.params.id);
  crawlURL(req.params.id, ()=>{
      console.log("done")
  }).then((links)=>{
    console.log("done")
    res.status(200).send(JSON.stringify(links))
  }).catch((e) => {
    console.log(e)
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });;
  
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

