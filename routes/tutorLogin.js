/**
 * Created by Steven on 11/17/2016.
 */
var express = require('express');
var route = express.Router();
var db = require('../database/queries');
var fs = require('fs');
var moment = require('moment');

route.post('/', db.loginTutor, loginErrorHandler, loginTutorSuccessHandler, db.loginStudent, loginSuccessHandler);

function loginErrorHandler(err,req,res,next){
    var errText = "[ "+ moment(new Date()).format("YYYY-DD-MM HH:MM:SS") + " ]: " + err.message + " Query: " + err.query + '\n';
    var file = './logs/error.log';
    fs.appendFile(file,errText, function(writeErr){console.log("Error Writing to log: " + writeErr)});
    var obj = {name: req.body.name, a_number: req.body.anumber};
    res.render('partials/tutorLogin', {data: obj, error: true, title: "Tutor Login"});
}

function loginTutorSuccessHandler(req,res, next){
    if(req.body.tutoring == 'tutoring') {
        res.render('partials/tutorQueuePage', {title: "Tutor Queue"});
    }
    else{
        next();
    }
}

function loginSuccessHandler(req,res){
        res.render('partials/studentRequest', {data: req.my_data, title: "Request Page"});
}






module.exports = route;