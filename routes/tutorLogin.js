/**
 * Created by Steven on 11/17/2016.
 */
var express = require('express');
var route = express.Router();
var bodyParser = require('body-parser');
var parseUrlEncoder = bodyParser.urlencoded({extended: false});
var db = require('../database/queries');

route.post('/',parseUrlEncoder, db.loginTutor, loginErrorHandler, loginTutorSuccessHandler, db.loginStudent, loginSuccessHandler);

function loginErrorHandler(err,req,res,next){
    console.log("Error in Tutor Login: " + err);
    var obj = {name: req.body.name, a_number:req.body.anumber};
    res.render('partials/tutorLogin', {data: obj, error: true});
}

function loginTutorSuccessHandler(req,res, next){
    if(req.body.tutoring == 'tutoring') {
        res.render('partials/tutorQueuePage');
    }
    else{
        next();
    }
}

function loginSuccessHandler(req,res){
        res.render('partials/request', {data: req.my_data});
}






module.exports = route;