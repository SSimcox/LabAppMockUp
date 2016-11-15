/**
 * Created by Steven on 11/12/2016.
 */

var express = require('express');
var engine = require('ejs-mate');
var login = require('./routes/login');

var app = express();

app.use('/public',express.static('public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('/views', __dirname + '/views');

app.use('/login', login);
app.get('/',function(req,res){
    console.log("Attempting Redirect");
    res.redirect('login');
});

app.listen(3000,function(){console.log("Listening on 3000")});