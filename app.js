var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var indexRouter = require('./app/routes/index');

// Configuring port and the database
var config = require('./app/config/config.js');
var mongoose = require('mongoose');

// setting size limit
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


// catch 404 and forward to error handler and Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // next(createError(404));
    next();
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


require('./app/routes/course.routes.js')(app);
require('./app/routes/course-article.routes.js')(app);
require('./app/routes/course-day-session.routes')(app);

require('./app/routes/course-image.routes.js')(app);
require('./app/routes/course-video.routes.js')(app);
require('./app/routes/gallary.routes.js')(app);


mongoose.Promise = global.Promise;

mongoose.set("strictQuery", false);
// Connecting to the database
mongoose.connect(config.url, {
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.listen(config.serverport, () => {
    console.log(`Server is running on port ${config.serverport}.`);
});


module.exports = app;