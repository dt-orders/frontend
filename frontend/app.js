var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
var proxy = require('express-http-proxy');

// PUG view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// these defaults assume kubernetes DNS resolution (i.e. no service mesh)
// if running in docker-compose, set URL to http://172.17.0.1 and match external port like 8081
var customerUrl = process.env.CUSTOMER_URL || 'http://customer:8080',
    catalogUrl = process.env.CATALOG_URL || 'http://catalog:8080',
    orderUrl = process.env.ORDER_URL || 'http://order:8080'

if (process.env.MONOLITH === "true") {
  var options = {
    index: "monolith-index.html"
  };
  app.use(express.static(path.join(__dirname, 'public'),options));
  console.log('Running in MONOLITH mode');
} else {
  app.use(express.static(path.join(__dirname, 'public')));
  console.log('Running in STANDARD mode');
}


console.log('customerUrl: ' + customerUrl);
console.log('catalogUrl: ' + catalogUrl);
console.log('orderUrl: ' + orderUrl);

app.use('/catalog', proxy(catalogUrl));
app.use('/order', proxy(orderUrl));
app.use('/customer', proxy(customerUrl));

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
