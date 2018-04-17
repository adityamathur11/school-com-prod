/**
 * Created by aditya on 16/4/18.
 */
var route = require('express').Router();
var User = require('../models/User');
var Response = require('../responses/response');

route.get('/users/:id', function (req, res) {
    User.findOne({_id : req.params.id}, function (err , user) {
        if(err) {
            res.status(Response.InternalServerError.code);
            res.json(Response.InternalServerError.message)
        } else if(user){
            if(user._id.toString() === req.user._id.toString() || user.isAdmin()) {
                res.json(user);
            } else{
                res.status(Response.Forbidden.code);
                res.json(Response.Forbidden.message);
            }
        } else {
            res.status(Response.ResourceNotFound.code);
            res.json(Response.ResourceNotFound.message);
        }
    })
});

route.get('/users',function (req, res) {
    if(req.user.isAdmin()){
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
    } else{
        res.status(Response.Forbidden.code);
        res.json(Response.Forbidden.message);
    }
});

User.prototype.isAdmin = function () {
   return this.role === 'K_USER_TYPE_ADMIN';
};
route.delete('/users/:id', function (req, res) {
    if(req.user.isAdmin()){
        User.findByIdAndRemove(req.params.id, function (err) {
            if(err){
                res.status(Response.InternalServerError.code)
                res.json(Response.InternalServerError.message);
            } else{
                res.status(Response.Deleted.code);
                res.json(Response.Success.message);
            }
        })
    } else{
        res.status(Response.Forbidden.code);
        res.json(Response.Forbidden.message);
    }
});

User.prototype.saveAsAdmin = function (cb) {
    var self = this;
    self.role = 'K_USER_TYPE_ADMIN';
    User.findOne({email : self.email}, function (err, user) {
        if(err) {
            console.log(Response.InternalServerError.message);
        } else if(user){
            console.log(Response.ResourceConflict.message);
        } else{
            new User(self).save(function (err, user) {
                if(err){
                    console.log(Response.InternalServerError.message);
                } else{
                    console.log(Response.Created.message);
                    cb();
                }
            })
        }
    });

};
module.exports = route;