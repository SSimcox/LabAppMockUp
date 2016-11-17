/**
 * Created by Steven on 11/12/2016.
 */
var express = require('express');
var route = express.Router();
var bodyParser = require('body-parser');
var parseUrlEncoder = bodyParser.urlencoded({extended: false});


var students = [01186010];

route.get('/', function(req,res){
    res.render('partials/login', {error: false});
});

route.post('/', parseUrlEncoder, function(req,res){

    // Check database For ID
    // If ID is not in database, get data from Banner API for ID
    // If Not, render with error: true


    if(~students.indexOf(parseInt(req.body.anumber)) == 0) {
        res.render('partials/login', {error: true});
    } else {
        res.redirect('/request?number='+req.body.anumber);
    }
});

module.exports = route;