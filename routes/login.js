/**
 * Created by Steven on 11/12/2016.
 */
var express = require('express');
var route = express.Router();
var db = require('../database/queries');

route.get('/', function(req,res){
    res.render('partials/studentLogin', {error: false});
});

route.post('/', db.loginStudent, loginErrorHandler,loginSuccessHandler);

function loginErrorHandler(err,req,res,next){
    res.render('partials/studentLogin', {error: true});
}

function loginSuccessHandler(req,res, next){
    if(req.my_data.is_tutor) {
        res.render('partials/tutorLogin', {data: req.my_data, error: false});
    } else {
        res.render('partials/studentRequest', {data: req.my_data});
    }
}

module.exports = route;