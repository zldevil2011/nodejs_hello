var log4js = require('log4js');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');

//var session = require('session');
var bodyParser = require('body-parser');
var routes = require('./routes/blogs');
var users = require('./routes/users');
var jade = require('jade');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();
var RedisStore = require('connect-redis');
// view engine setup
app.set('views', path.join(__dirname, 'views'));

//配置日志系统
log4js.configure({
    appenders: [
        {type:'console'}, {
            type:'file',
            filename:'logs/access.log',
            maxLogSize:1024,
            backups:4,
            category:'normal'
        }
    ],
    replaceConsole:true
});

//var logger = log4js.getLogger('normal');
//logger.setLevel('INFO');


// 使用ejs模版引擎
var ejs=require('ejs');
app.set('view engine', 'ejs');

//通过ejs使用html文件
//使用html模版引擎
// app.engine('.html',ejs.__express);
// app.set('view engine', 'html');

//默认的jade模版引擎
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: '12345',
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
}));

exports.logger = function(name){
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
};

//应用Log系统
app.use(log4js.connectLogger(this.logger('normal'), {level:'auto'}));//, format:':method :url'

app.use('/', routes);
app.use('/user', users);
app.use('/test', routes);
app.use('/test111',function(req, res){
   console.log("test if the console was loged");
    //this.logger.info("This is an index page! -- log4js");
    res.send('Just for test');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
//}

// production error handler
// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: {}
//  });
//});


module.exports = app;

app.listen(3005);
exports.logger = this.logger();

