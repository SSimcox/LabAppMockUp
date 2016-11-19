/**
 * Created by Steven on 11/14/2016.
 */
var express = require('express');
var route = express.Router();
var bodyParser = require('body-parser');


route.get('/', requestPage);

function requestPage(req,res){
   //Query database with anumber(req.query.anumber)
   //Fill Class/Teacher info
   res.render('partials/request', {name: req.my_data.name});
}


module.exports = route;