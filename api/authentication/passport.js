/**
 * Created by aditya on 16/4/18.
 */
var JwtStrategy = require('passport-jwt').Strategy
    ,ExtractJwt = require('passport-jwt').ExtractJwt
    ,config = require('config');

var Response = require('../responses/response');

var User = require('../models/User');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
opts.secretOrKey = config.auth_secret;

module.exports = function(passport) {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

        User.findOne({_id: jwt_payload.id}, function(err, user) {
            if (err) {
                Response.InternalServerError.message.name = "JsonWebTokenError";
                return done(err, false, Response.InternalServerError.message);
            }
            if (user) {
                done(null, user);
            } else {
                Response.ResourceNotFound.message.name = "JsonWebTokenError";
                done(null, false, Response.ResourceNotFound.message);
            }
        });
    }));
};