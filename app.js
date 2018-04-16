/**
 * Created by aditya on 16/4/18.
 */
var express = require('express')
    ,mongoose = require('mongoose')
    ,config = require('config')
    ,bodyParser = require('body-parser')
    ,passport = require('passport')
    ,morgan = require('morgan');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

var privateUserAPIs = require('./api/controllers/User.controller');
var privateTaskAPIs = require('./api/controllers/balance.controller');
var publicAPIs = require('./api/controllers/public.controller');
var Response = require('./api/responses/response');

app.use(passport.initialize());
require('./api/authentication/passport')(passport);

app.use('/API',publicAPIs);

app.use('/API/private', function (req, res, next) {
    if(req.header("Authorization")){
        if(req.header("Authorization").indexOf("JWT ") === 0){
            next();
        } else{
            res.status(Response.InvalidTokenn.code);
            res.json(Response.InvalidTokenn.message);
        }
    } else{
        res.status(Response.NoToken.code);
        res.json(Response.NoToken.message);
    }
});
app.use('/API', function (req, res, next) {
    passport.authenticate('jwt', {session : false}, function(err, user, info) {
        if (err) {
            res.status(Response.InternalServerError.code);
            res.json(Response.InternalServerError.message);
        }
        else if (!user) {
            res.status(Response.InvalidTokenn.code);
            res.json(info);
        } else{
            req.user = user;
            next();
        }
    })(req, res, next);
},privateUserAPIs);
app.use('/API', function (req, res, next) {
    passport.authenticate('jwt', {session : false}, function(err, user, info) {
        if (err) {
            res.status(Response.InternalServerError.code);
            res.json(Response.InternalServerError.message);
        }
        else if (!user) {
            res.status(Response.InvalidTokenn.code);
            res.json(info);
        } else{
            req.user = user;
            next();
        }
    })(req, res, next);
},privateTaskAPIs);

var PORT = process.env.PORT || 3000;
connectDB();
mongoose.connection.once('connected', function () {
    app.listen(PORT, function () {
        console.log('Server is running. \nGo to localhost:'+PORT+".");
    })
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

function connectDB() {
    const options = {
        autoIndex: false,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        poolSize: 10,
        bufferMaxEntries: 0
    };
    mongoose.connect(config.db, options);
}

/*
    TODO : 1. get mlab account
    TODO : 2. setup prod env
    TODO : 3. basic ui with angular bootstrap
    TODO : 4. deploy on heroku
    TODO : 5. handle bower and npm
 */
