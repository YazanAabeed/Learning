var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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

app.listen(8080, function () {
    console.log('Express server listening');
});


module.exports = app;

// In EcmaScript 5...
//
// var nodePandoc = require('node-pandoc');
// var src, args, callback;
//
// src = './yazan.docx';
//
//
// // Or in an array of strings -- careful no spaces are present:
// args = ['-f','docx','-t','html', '--highlight-style', 'example.html'];
//
// // Set your callback function
// callback = function (err, result) {
//
//     if (err) {
//         console.error('Oh Nos: ',err);
//     }
//
//     console.log(result);
//
//     return result;
// };
//
//
// // Call pandoc
// nodePandoc(src, args, callback)


var mammoth = require("mammoth");

var options = {
    styleMap: "p[style-name='Section Title'] => h1:fresh\n" +
    "p[style-name='Subsection Title'] => h2:fresh",
    includeDefaultStyleMap: false
};
mammoth.convertToHtml({path: "./yazan.docx"}, options)
    .then(function(result){
        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion

        console.log(result);
    })
    .done();