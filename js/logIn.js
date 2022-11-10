
$.getScript('../model/user.js', function()
{


    $("#btnSubmit").click(function(e){

        valid = true;
    
        /*var user = User.logIn(email, pass);
        //checar base de datos correo
    
        //session cookies
        sessionStorage.setItem("user", JSON.stringify(user));
    
        //si todo bien, dirigir a menu principal
        window.location.href= "MainMenu.html";
    
        if(!valid){
            e.preventDefault();
        }*/
    });
});

function validate(){
    let email = $("#InpEmail").val();
    let pass = $("#InpPassword").val();

    if(email == "" || pass == "")
    {
        $("#errorLabel").css("display", "block");
        return false;
    }else{
               
        return true;
    }
}
