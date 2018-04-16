/**
 * Created by aditya on 16/4/18.
 */
var router =  require('express').Router();
var User = require('../models/User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('config');
var Response = require('../responses/response');


router.post('/login',function (req, res) {
    if(req.body.email !== undefined && req.body.password !== undefined){
        User.findOne({email: req.body.email}, function (err, user) {
            if(user){
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if(err){
                        res.status(Response.InternalServerError.code);
                        res.json(Response.InternalServerError.message)
                    }
                    if(result === true){
                        var token = jwt.sign({id : user._id}, config.auth_secret ,{expiresIn: config.tokenExpireTime});
                        res.json({token: 'JWT ' + token });
                    } else {
                        res.status(Response.InvalidCredentials.code);
                        res.json(Response.InvalidCredentials.message);
                    }
                })
            } else{
                res.status(Response.ResourceNotFound.code);
                res.json(Response.ResourceNotFound.message);
            }
        })
    } else {
        res.status(Response.InvalidParameters.code);
        res.json(Response.InvalidParameters.message);
    }
});

router.post('/register',function (req, res) {
    User.findOne({
        email: req.body.email
    },function (err , user) {
        if(user){
            res.status(Response.ResourceConflict.code);
            res.json(Response.ResourceConflict.code)
        } else{
            var newUser = new User(util.getPostObject(model, req.body));
            newUser.save(function (err , user) {
                if(err) {
                    res.status(Response.InternalServerError.code);
                    res.json(Response.InternalServerError.message);
                } else {
                    res.json(Response.Success.message);
                }
            });
        }
    })
});

module.exports = router;