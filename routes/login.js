/**
 * Created by Steven on 11/12/2016.
 */
var express = require('express');
var route = express.Router();
var db = require('../database/queries');

route.get('/', db.getActiveStudents, db.getQueue, function(req,res){
    var numInQueue = 0;
    if(req.queue && req.queue.length)
        numInQueue = req.queue.length;
    actStudents = req.numStudents;
    res.render('partials/studentLogin', {error: false, queue: numInQueue, actStudents: actStudents, title: "Login"});
});

route.post('/', db.loginStudent, loginErrorHandler,loginSuccessHandler);

function loginErrorHandler(err,req,res,next){
    res.render('partials/studentLogin', {error: true, title: "Login"});
}

function loginSuccessHandler(req,res, next){
    if(req.my_data.is_tutor) {
        res.render('partials/tutorLogin', {data: req.my_data, error: false, title: "Tutor Login"});
    } else {
        res.render('partials/studentRequest', {data: req.my_data, title: "Request Page"});
    }
}

module.exports = route;