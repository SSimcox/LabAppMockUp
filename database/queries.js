/**
 * Created by Steven on 11/17/2016.
 */

//DATABASE
var connectionString = 'postgres://postgres:@localhost:5432/spring2017';
var pgp = require('pg-promise')();
var db = pgp(connectionString);




function loginStudent(req,res,next){
    console.log("Attempting to Log student in");
    var lookupNumber = parseInt(req.body.anumber);
    db.one('select * from students where a_number=$1', lookupNumber)
        .then(function(data){
            console.log("Got that data");
            req.my_data = data;
            next();
        })
        .catch(function(err){
            console.log("You got thrown in the error: " + err);
            return next(err);
        });
}

function loginTutor(req,res,next){
    var lookupNumber = parseInt(req.body.anumber);
    var password = req.body.password;
    console.log('password: ' + password);
    if(req.body.tutoring != "tutoring")
    {
        next();
    }
    else {
        db.one('select * from students where a_number=$1 and password=$2', [lookupNumber, password])
            .then(function (data) {
                req.my_data = data;
                next();
            })
            .catch(function (err) {
                console.log("You got thrown in the error: " + err);
                return next(err);
            });
    }
}

function addToQueue(req,res,next){}

function getActiveStudents(req,res,next){}
function getQueue(req,res,next){}

function addToInProgress(res,req,next){}
function addToHelpHistory(req,res,next){}

function logoutStudent(req,res,next){}
function logoutAllStudents(req,res,next){}





module.exports = {
    loginStudent: loginStudent,
    loginTutor: loginTutor,
    addToQueue: addToQueue,
    getActiveStudents: getActiveStudents,
    getQueue: getQueue,
    addToInProgress: addToInProgress,
    addToHelpHistory: addToHelpHistory,
    logoutStudent: logoutStudent,
    logoutAllStudents: logoutAllStudents
}