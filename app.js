/**
 * Created by Steven on 11/12/2016.
 */

var express = require('express');
var engine = require('ejs-mate');
var login = require('./routes/login');
var requestRoute = require('./routes/requestRoute');
var connectionString = 'postgres://localhost:5432/spring2017';
var pg = require('pg-promise')();
var db = pg(connectionString);

var app = express();

app.use('/public',express.static('public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('/views', __dirname + '/views');

app.use('/login', login);
app.use('/request', requestRoute);

app.get('/',function(req,res){
    console.log("Attempting Redirect");
    res.redirect('login');
});

app.listen(3000,function(){console.log("Listening on 3000")});