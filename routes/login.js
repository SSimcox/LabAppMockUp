/**
 * Created by Steven on 11/12/2016.
 */
var express = require('express');
var route = express.Router();

route.get('/', function(req,res){
    console.log('You are totally in login');
    res.render('partials/login');
});













module.exports = route;