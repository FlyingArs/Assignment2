/*
 * File Name: app.js
 * Author's Name: David Yu 200286902
 * Website Name:donaldrich.heroku.com
 * File Desciption: this file is the entry point of the whole web application
 */

//delcare variabes and create all the objects needed for this website to run
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//create a mongoose object
var mongoose = require('mongoose');


var routes = require('./routes/index');
var users = require('./routes/users');
//link the contacts handler
var contacts = require('./routes/contacts');

var app = express();

//connect to the mongolab online database
mongoose.connect('mongodb://MongoYu:Mongo214@ds051858.mongolab.com:51858/week5');

//create a connection object
var db = mongoose.connection;

//print error if connection failed. send a message if connection succeded
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', function(callback){
    console.log('Conncected to mongodb');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//use the contacts handler
app.use('/contacts', contacts);

//delcare the use of public folder
//app.use(express.static(__dirname + '/public'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/*
 * add an express router to render each of the five pages
 */
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/projects', function (req, res) {
    res.render('projects');
});

app.get('/services', function (req, res) {
    res.render('services');
});

app.get('/contact', function (req, res) {
    res.send('contact');
});


module.exports = app;