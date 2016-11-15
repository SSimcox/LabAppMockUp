/**
 * Created by Steven on 11/14/2016.
 */
var express = require('express');
var route = express.Router();
var bodyParser = require('body-parser');


var students = [01186010];

route.post('/', function(req,res){
    if(!students.indexOf(req.body.anumber))
    {
        console.log("Search Failed");
        res.redirect('/');
    } else {
        res.render('partials/request', {number: anumber});
    }
});


