/**
 * Created by Steven on 11/12/2016.
 */
var express = require('express');
var route = express.Router();
var bodyParser = require('body-parser');
var parseUrlEncoder = bodyParser.urlencoded({extended: false});
var db = require('../database/queries');


var students = [01186010];

route.get('/', function(req,res){
    res.render('partials/login', {error: false});
});

route.post('/', parseUrlEncoder, db.loginStudent, loginErrorHandler,loginSuccessHandler);

function loginErrorHandler(err,req,res,next){
    res.render('partials/login', {error: true});
}

function loginSuccessHandler(req,res, next){
    if(req.my_data.tutor) {
        res.render('partials/tutorLogin', {data: req.my_data, error: false});
    } else {
        res.render('partials/request', {data: req.my_data});
    }
}

module.exports = route;