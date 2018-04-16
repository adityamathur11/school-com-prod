/**
 * Created by aditya on 16/4/18.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
        email : {
            type: String,
            required : true
        },
        username : {
            type : String,
            required : true
        },
        dob : {
            type : Date,
            required : true
        },
        role : {
            type : String,
            required : true,
            enum : ['K_USER_TYPE_ADMIN', 'K_USER_TYPE_SUBS']
        },
        attempts : {
            type : Number,
            default : 0
        },
        password : {
            type : String,
            required : true,
            select: false
        },
        created_at: {
            type : Date,
            required : false
        },
        updated_at: {
            type : Date,
            required : false
        }
    },
    {
        versionKey : false,
        strict : true
    });

UserSchema.pre('save' , function (next) {
    currUser = this;
    var currDate = new Date();
    this.updated_at = currDate;
    this.created_at = currDate;

    bcrypt.hash(this.password,10,function (err, hash) {
        currUser.password = hash;
        next();
    })
});

UserSchema.pre('update', function(next) {
    this.updated_at = new Date();
    next();
});

module.exports = mongoose.model('User' , UserSchema);