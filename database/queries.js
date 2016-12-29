/**
 * Created by Steven on 11/17/2016.
 */

//DATABASE
var connectionString = 'postgres://postgres:@localhost:5432/spring2017';
var pgp = require('pg-promise')();
var db = pgp(connectionString);

function loginStudent(req,res,next){
    if(req.body.anumber[0] == "a" || req.body.anumber[0] == "A"){
        req.body.anumber = req.body.anumber.slice(1);
    }
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
    console.log("adding to queue");
    var classArray = req.body.class.split(",");

    db.none('insert into queue(student_id, student_name, class, reason, description) values($5,$1,$2,$3,$4)', [req.body.name, classArray, req.body.reason, req.body.description,req.body.studentId])
        .then(function(){
            console.log("inserted");
            next();
        }).catch(function(err){
        console.log("Not added to queue: " + err);
        next(err);
    })
}

function getActiveStudents(req,res,next){
    db.any('select * from active_students')
        .then(function(data){
            req.numStudents = data.length;
        }).catch(function(err){
            req.numStudents = 0;
    });
    next();
}

function getQueue(req,res,next){
    db.any('select * from queue')
        .then(function(data){
            req.my_data = data;
            next();
        }).catch(function(err){
            next();
    });
}

function addToInProgress(res,req,next){}
function addToHelpHistory(data){
    db.none('insert into traffic_table(student_id,class_name,time_in) values(${id},${},${}', data)
        .then(function(){

        }).catch(function(err){

    })
}

function logoutStudent(req,res,next){
    db.any('delete from active_students where student_id=$1', req.body.id)
        .then(function(data){
            req.my_data = data;
            if(!data.is_tutor) {
                addToHelpHistory(data);
            }
            next();
        }).catch(function(err){
            next(err);
    })
}
function logoutAllStudents(req,res,next){}

function addToActiveStudents(studentData){
    db.none('insert into active_students(student_id,is_tutor) values($1,false)',studentData.id)
        .then(function(){

        }).catch(function(err){
        console.log("Not added to active students: " + err);
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