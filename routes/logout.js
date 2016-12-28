/**
 * Created by Steven on 11/29/2016.
 */

var express = require('express');
var route = express.Router();
var db = require('../database/queries');

route.post('/',db.logoutStudent,logoutFailure,logoutSuccess);

function logoutSuccess(req,res,next){
    res.redirect('/');
}

function logoutFailure(err,req,res,next){
    console.log("logout failed: " + err);
    res.redirect('/');
}

module.exports = route;