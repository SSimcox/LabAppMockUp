/**
 * Created by Steven on 11/17/2016.
 */

$(document).ready(function(){
    var tutoring = true;
    $('#tutoring').on('change', toggleButton);
    $('#need-help').on('change', toggleButton);
});

function toggleButton(){
    if(tutoring)
        $("#login-button").html("Get Me Help");
    else
        $("#login-button").html("Clock Me In");
    tutoring = !tutoring;
}