/**
 * Created by Steven on 11/17/2016.
 */

//DATABASE
var connectionString = 'postgres://postgres:@localhost:5432/spring2017';
var pgp = require('pg-promise')();
var db = pgp(connectionString);

function loginStudent(req,res,next){
    var lookupNumber = parseInt(req.body.anumber);
    db.one('select * from students where a_number=$1', lookupNumber)
        .then(function(data){
            req.my_data = data;
            addToActiveStudents(data);
            next();
        })
        .catch(function(err){
            console.log("You got thrown in the error: " + err);
            next(err);
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
                addToActiveTutors(data);
                req.my_data = data;
                next();
            })
            .catch(function (err) {
                console.log("You got thrown in the error: " + err);
                return next(err);
            });
    }
}

function addToQueue(req,res,next){
    db.none('insert into queue(student_name, class) values($1,$2)', req.body.name, req.body.class)
        .then(function(){
            next();
        }).catch(function(err){
        next(err);
    })
}

function getActiveStudents(req,res,next){}
function getQueue(req,res,next){}

function addToInProgress(res,req,next){}
function addToHelpHistory(data){
    db.none('insert into traffic_table(student_id,class_name,time_in) values(${id},${},${}', data)
        .then(function(){

        }).catch(function(err){

    })
}

function logoutStudent(req,res,next){
    db.any('delete from active_students where student_id=(select ID from students where a_number=$1', req.body.lookupNumber)
        .then(function(data){
            req.my_data = data;
            addToHelpHistory(data);
            next();
        }).catch(function(err){
            next(err);
    })
}
function logoutAllStudents(req,res,next){}

function addToActiveStudents(studentData){
    db.none('insert into active_students(student_id,tutor) values($1,false)',studentData.id)
        .then(function(){
            console.log('Added to Active Students');
        }).catch(function(err){
        console.log("Not added to active students");
    })
}

function addToActiveTutors(tutorData){
    db.none('update active_students set is_tutor=true where student_id=$1)',tutorData.id)
        .then(function(){
            console.log('Added to Active Queue');
        }).catche(function(err) {
        console.log("Not added to active queue");
    });
}

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