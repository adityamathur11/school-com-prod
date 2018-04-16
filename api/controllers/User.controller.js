/**
 * Created by aditya on 16/4/18.
 */
var route = require('express').Router();
var User = require('../models/User');
var Response = require('../responses/response');

route.get('/users/:id', function (req, res) {
    // TODO : Fix self profile view
    User.findOne({_id : req.params.id}, function (err , user1) {
        var user = Object.assign({}, user1._doc);
        if(err) {
            res.status(Response.InternalServerError.code);
            res.json(Response.InternalServerError.message)
        }
        if(user._id.toString() === req.user._id.toString()) {
            res.json(user);
        } else{
            res.json(user)
        }
    })
});

route.get('/users',function (req, res) {
    // TODO : apply admin check
    var skip = req.query.skip ? parseInt(req.query.skip) : 0;
    var limit = req.query.limit ? parseInt(req.query.limit) : 10;

    User.find()
        .skip(skip)
        .limit(limit)
        .exec(function (err , users) {
            if(err){
                res.status(Response.InternalServerError.code)
                res.json(Response.InternalServerError.message);
            }
            res.json(users);
        })
});


route.delete('/users/:id', function (req, res) {
    // TODO : delete a user with admin details
});

// TODO : Admin generator
module.exports = route;