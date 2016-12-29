/**
 * Created by Steven on 11/24/2016.
 */

$(document).ready(function(){
    $(".request-form-div div").hide();
    $("form input[type=submit]").hide();

    $('.class-div').click(function(e){
        var forms = $("form");
        for(var i = 0; i < forms.length - 1; ++i) {
                if (forms[i].id != e.currentTarget.id) {
                    $("#" + forms[i].id + " div div").hide("slow", function(){

                    });
                    $("#" + forms[i].id + " input[type=submit]").hide("slow", function(){

                    });
                }
                else {
                    $("#" + e.currentTarget.id + " div div").show("slow", function(){

                    });
                    $("#" + e.currentTarget.id + " input[type=submit]").show("slow", function(){

                    });
                }
            }
    });
});