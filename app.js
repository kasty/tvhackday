var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
<<<<<<< HEAD
// var routes          = require('./routes/index');
var users           = require('./routes/users');
=======
>>>>>>> 636cbf3706c62cc1f6738bf5b4563f4eb477c76a
var app             = module.exports = express();
var server          = require('http').createServer(app);
var io              = require('socket.io').listen(server);

io.on('connection', function(socket) {
    socket.on('kick_event', function (data) {
        socket.broadcast.emit('kick_event', data);
    });
});
//
// == Should be abstracted in an object
app.set('players', require('./players'));
//
// == Reference the socket engine
app.set('io', io);
//
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//
// == Routing
app.use('/', require('./routes/index'));
app.use('/mobile', require('./routes/mobile'));
app.use('/game', require('./routes/game'))
//
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
//
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
//
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
//
server.listen(3000);
