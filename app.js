var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');
var Sequelize = require('sequelize');
var indexRouter = require('./routes/index');
var staffRouter = require('./api/staff/staffRouter');
var studentRouter = require('./api/student/studentRouter');
var feesRouter = require('./api/fees/feesRouter');
var reportRouter = require('./api/report/reportRouter');

var fs = require('fs');
var http = require('http');
var https = require('https');
var model = require('./models');
var sequelize = require("./config/database");
var app = express();
app.use(cors());
// view engine setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/staff', staffRouter);
app.use('/student', studentRouter);
app.use('/fees', feesRouter);
app.use('/report', reportRouter);

//app.use('/users', usersRouter);
//app.use('/users/user', usersRouter);
//app.use('/booking', bookingRouter);
//app.use('/agent', agentsRouters);
//app.use('/admin', adminRouters);
//app.use('/driver', driverRouters);
//sequelize.sync();
//sequelize.sync({ alter: true })
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
    //res.render('error');
});
// error handler
app.use(function (err, req, res, next) {
    console.log(req + "======*" + err.message);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
console.log("=====port==" + process.env.API_PORT);
port = process.env.API_PORT;
/**
 * Server code for Local
 */
var httpServer = http.createServer(app);
httpServer.listen(port, function () {
    console.log("Example app listening at https://localhost:".concat(port));
    console.log('HTTP Server running on port ' + port);
});
/****
 * Server code for live
 * ** */
/*
var privateKey  = fs.readFileSync('/etc/letsencrypt/live/vishwacarrental.com/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/vishwacarrental.com/fullchain.pem', 'utf8');
//console.log("certificate:"+certificate);
var credentials = {key: privateKey, cert: certificate};
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(4434, () => {
    console.log('HTTP Server running on port 4434');
});

httpsServer.listen(port, () => {
    console.log('HTTPS Server running on port'+port);
});
*/
module.exports = app;
