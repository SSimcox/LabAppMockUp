/**
 * Created by Steven on 11/14/2016.
 */
var express = require('express');
var route = express.Router();
var bodyParser = require('body-parser');


route.get('/', function(req,res){
    //Query database with anumber(req.query.anumber)
    //Fill Class/Teacher info





   res.render('partials/request', {number: req.query.number});
});

module.exports = route;