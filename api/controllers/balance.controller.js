/**
 * Created by aditya on 17/4/18.
 */
var route = require('express').Router();
var User = require('../models/User');
var Response = require('../responses/response');

var isBalanced = function(str) {
    str = str.replace(/[^\[\]\{\}\(\)]/g,"");
    var input = str.split("");
    var stack = [];
    var top;
    input.forEach(function (element) {
        top = stack.length-1;
        if (stack[top]) {
            last_element = stack[top];
            if ((last_element === '(' && element === ')') ||
                (last_element === '[' && element === ']') ||
                (last_element === '{' && element === '}')) {
                stack.pop();
            } else {
                stack.push(element);
            }
        } else {
            stack.push(element);
        }
    });

    return stack.length === 0;
};


route.post('/balanced', function (req, res) {
    // TODO : implement increment and change messages
    if(isBalanced(req.body.input)){
        res.json(Response.Success.message);
    } else{
        res.json({messgae : "fail"});
    }
});