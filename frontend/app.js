var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs')

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

console.log('customerUrl: ' + customerUrl);
console.log('catalogUrl: ' + catalogUrl);
console.log('orderUrl: ' + orderUrl);

// proxy the backend and service requests
if (process.env.MONOLITH === "true") {
  console.log('Running in MONOLITH mode');

  app.get('/',function(req, res) {
    if (!req.query.username) {
      userName = "Guest";
    } else {
        userName = req.query.username;
    }
    html = fs.readFileSync('public/monolith-index.html').toString().replace("REPLACE_USER_NAME", userName); 
    res.send(html);
  });

  app.use('/catalog', proxy(catalogUrl,{
    proxyReqPathResolver: function (req) {
      var parts = req.url.split('?');
      var queryString = parts[1];
      var updatedPath = '/catalog' + parts[0];
      return updatedPath + (queryString ? '?' + queryString : '');
    }}));
  app.use('/order', proxy(orderUrl,{
    proxyReqPathResolver: function (req) {
      var parts = req.url.split('?');
      var queryString = parts[1];
      var updatedPath = '/order' + parts[0];
      return updatedPath + (queryString ? '?' + queryString : '');
    }}));
  app.use('/customer', proxy(customerUrl,{
    proxyReqPathResolver: function (req) {
      var parts = req.url.split('?');
      var queryString = parts[1];
      var updatedPath = '/customer' + parts[0];
      return updatedPath + (queryString ? '?' + queryString : '');
    }}));
} else {
  console.log('Running in STANDARD mode');
  app.get('/',function(req, res) {
    if (!req.query.username) {
      userName = "Guest";
    } else {
        userName = req.query.username;
    }
    html = fs.readFileSync('public/index.html').toString().replace("REPLACE_USER_NAME", userName); 
    res.send(html);
  });
  app.use('/catalog', proxy(catalogUrl));
  app.use('/order', proxy(orderUrl));
  app.use('/customer', proxy(customerUrl));
}

app.use(express.static(path.join(__dirname, 'public')));

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
